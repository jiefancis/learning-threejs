/*
 * @Descripttion: 
 * @version: 
 * @Author: wangjie
 * @Date: 2021-08-18 18:26:58
 * @LastEditors: wangjie
 * @LastEditTime: 2021-09-11 10:10:23
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App);
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(directives)
app.use(router)
app.use(store)
app.mount('#app')

app.config.globalProperties.$message({showClose: true})
