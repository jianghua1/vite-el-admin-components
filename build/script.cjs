/* eslint-env node*/
// 读取components中所有.vue结尾的文件
const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const appendMarker = '// append-by-scripts'

//定义根目录
const basePath = path.join(__dirname, '..')

const getPath = (name) => path.join(basePath, name)

const componentPrefix = 'Vp'
//定义组件所在目录
const componentsDir = getPath('src/components')
const mainFilePath = getPath('src/main.ts')
const typesFilePath = getPath('src/components-types.ts')

let componentExports = ''
let pluginContentLines = []
let components = []
let hooksExports = ''

let typesExports = ''
let importStatements = ''
let exportStatements = ''
const typesFiles = []

function renameTypes(filePath, index) {
  //读取类型文件
  let content = fs.readFileSync(filePath, 'utf-8')
  // 移除所有单行和多行注释
  content = content.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, '')

  const relativePath = './components/' + path.relative(componentsDir, filePath).replace(/\\/g, '/')

  const moduleName = `TypeModule${index}`

  importStatements += `import * as ${moduleName} from '${relativePath.replace('.ts', '')}';\n`
  //使用正则匹配其中的export接口、类型、枚举
  const matches = content.match(/export (type|interface|enum) (\w+)(<.*>)?/g) || []
  //加入类型私缀进行export导出
  matches.forEach((match) => {
    const typeName = match.split(' ')[2]
    exportStatements += `export type ${componentPrefix}${typeName} = ${moduleName}.${typeName};\n`
  })
}

function walkDir(dir) {
  //读取当前目录中所有的文件
  const files = fs.readdirSync(dir)
  //遍历读取文件的状态
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      walkDir(filePath)
    } else {
      if (stat.isFile()) {
        //读取components中的.vue结尾的文件
        const extension = path.extname(file)
        //获取文件名称
        const baseName = path.basename(file, extension)
        const importPath = `./components/${path
          .relative(componentsDir, filePath)
          .replace(/\\/g, '/')}`
        //处理组件
        if (extension === '.vue') {
          componentExports += `import ${baseName} from '${importPath}';\n`
          let componentName = baseName
          // if (['Menu', 'Header', 'Form', 'Table'].includes(baseName)) {
          //   componentName = `V${baseName}`
          // }
          // vp->vue plus
          componentName = componentPrefix + componentName
          components.push(`${baseName} as ${componentName}`)
          pluginContentLines.push(` app.component('${componentName}',${baseName}) `)
        }
        //处理composition API方法
        if (extension === '.ts' && baseName.startsWith('use')) {
          hooksExports += `export {${baseName}} from '${importPath.replace('.ts', '')}';\n`
        }
        //处理types并导出
        if (extension === '.ts' && baseName.startsWith('type')) {
          //读取types文件的内容
          // const typesFileContent = fs.readFileSync(filePath, 'utf-8')
          // typesExports += `export * from '${importPath.replace('.ts', '')}';\n`
          typesFiles.push(filePath)
        }
      }
    }
  })
}

walkDir(componentsDir)

typesFiles.forEach((filePath, index) => {
  renameTypes(filePath, index)
})

typesExports = importStatements + exportStatements
// 写类型文件
fs.writeFileSync(typesFilePath, typesExports)
// 按照export句式写入到src/main.ts中的"// append-by-scripts" 之后
let mainFileContent = fs.readFileSync(mainFilePath, 'utf-8')
// 获取标记
const markerIndex = mainFileContent.indexOf(appendMarker)
// 在标记位置之后添加内容
if (markerIndex !== -1) {
  mainFileContent = mainFileContent.substring(0, markerIndex + appendMarker.length)
} else {
  mainFileContent += '\n' + appendMarker
}

const pluginContent = `
export const globalPlugin = {
  install(app:any) {
    ${pluginContentLines.join('\n')}
  }
}

export default globalPlugin
export {${components.join(', ')}}
`

mainFileContent += '\n' + `${componentExports}\n${pluginContent}\n${hooksExports}`
mainFileContent += `export * from './components-types'`

fs.writeFileSync(mainFilePath, mainFileContent)
console.log('build script ok')

exec('npm run format', (err, stdout, stderr) => {
  if (err) {
    console.error(`执行命令出错: ${err}`)
    return
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`)
  }
  if (stdout) {
    console.log(`stdout: ${stdout}`)
  }
})
