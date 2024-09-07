import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import 'el-admin-components/dist/style.css'
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
