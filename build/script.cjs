/* eslint-env node*/
// 读取components中所有.vue结尾的文件
const path = require('path')
const fs = require('fs')

const appendMarker = '// append-by-scripts'

//定义根目录
const basePath = path.join(__dirname, '..')

const getPath = (name) => path.join(basePath, name)
//定义组件所在目录
const componentsDir = getPath('src/components')
const mainFilePath = getPath('src/main.ts')

let componentExports = ''
let pluginContentLines = []
let components = []
let hooksExports = ''

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
        const importPath = `@/components/${path
          .relative(componentsDir, filePath)
          .replace(/\\/g, '/')}`

        if (extension === '.vue') {
          componentExports += `import ${baseName} from '${importPath}';\n`
          components.push(baseName)
          let componentName = baseName
          if (['Menu', 'Header', 'Form', 'Table'].includes(baseName)) {
            componentName = `V${baseName}`
          }
          //app.use('xxx',xxx)
          pluginContentLines.push(` app.component('${componentName}',${baseName}) `)
        }

        if (extension === '.ts' && baseName.startsWith('use')) {
          hooksExports += `export {${baseName}} from '${importPath}';\n`
        }
      }
    }
  })
}

walkDir(componentsDir)
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
fs.writeFileSync(mainFilePath, mainFileContent)
