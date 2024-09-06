import { fileURLToPath, URL } from 'node:url'
// import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pkg from './package.json'

import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import I18n from '@intlify/unplugin-vue-i18n/vite'
import copy from 'rollup-plugin-copy'
import { visualizer } from 'rollup-plugin-visualizer'
import { exec } from 'child_process'

// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pkgName = pkg.name

// 自定义插件
const runPluginCommand = () => {
  return {
    name: 'run-plugin-command', // 插件名称
    buildEnd() {
      // 在构建开始时执行
      exec('npm run plugin', (error, stdout, stderr) => {
        if (error) {
          console.error(`执行命令出错: ${error}`)
          return
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`)
          return
        }
        console.log(`stdout: ${stdout}`)
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isAnalysis = process.env.ANALYSIS === 'true'
  const isSourcemap = process.env.SOURCEMAP === 'true'
  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      }),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],

        // global imports to register
        imports: [
          // presets
          'vue',
          // 'vue-router'
          // VueRouterAutoImports,
          '@vueuse/core'
        ],
        resolvers: [
          // ElementPlusResolver()
        ],
        vueTemplate: true
      }),
      Components({
        directoryAsNamespace: false,
        collapseSamePrefixes: true,
        resolvers: [
          // ElementPlusResolver()
        ]
      }),
      // I18n({
      //   include: [path.resolve(__dirname, './locales/**')],
      //   // 说明:由于配置了modules/i18n.ts中默认为legacy: false
      //   // 所以禁止修改
      //   compositionOnly: true,
      //   jitCompilation: true
      // }),
      dts({
        rollupTypes: true,
        compilerOptions: {
          skipDiagnostics: true
        },
        exclude: ['node_modules/**', 'dist/**']
      }),
      copy({
        targets: [
          {
            src: './locales',
            dest: 'dist/'
          }
        ],
        hook: 'writeBundle'
      }),
      visualizer({
        open: isAnalysis
      }),
      runPluginCommand()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      minify: true,
      sourcemap: isSourcemap,
      // cssCodeSplit: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/main.ts'),
        name: pkgName,
        formats: ['es', 'umd'],
        // the proper extensions will be added
        fileName: (format) => `${pkgName}.${format}.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [
          'vue',
          'element-plus',
          'video.js',
          'vditor',
          'howler',
          'vue-router',
          'vue-echarts',
          'echarts',
          'sortablejs',
          'vue-i18n',
          '@vueuse/core',
          // 'el-admin-components',
          'el-admin-components/locales/zh-cn.json',
          'el-admin-components/locales/en.json'
        ],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus',
            'video.js': 'videojs',
            vditor: 'Vditor',
            howler: 'Howler',
            'vue-router': 'VueRouter',
            'vue-echarts': 'VueEcharts',
            echarts: 'echarts',
            sortablejs: 'Sortablejs',
            'vue-i18n': 'VueI18n'
          },
          exports: 'named'
        }
      }
    }
  }
})
