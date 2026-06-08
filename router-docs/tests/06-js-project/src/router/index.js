import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'

/** @description 产品详情页 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    /**
     * @param {object} to - 目标路由
     * @param {object} from - 来源路由
     * @param {Function} next - 放行函数
     */
    beforeEnter (to, from, next) {
      if (localStorage.getItem('token')) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
