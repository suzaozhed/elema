import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

// 创建路由
const router = new Router({
  routes //  简写形式
})

// 暴露路由   ----   在入口文件处引入main.js
export default router
