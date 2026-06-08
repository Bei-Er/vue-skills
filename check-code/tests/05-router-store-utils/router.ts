import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 1: 缺少路由懒加载
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 2: 路由守卫部分分支未返回值
router.beforeEach((to, from) => {
  if (to.path === '/admin') {
    return '/login'
  }
  // 没有 return true 或不返回
})

// 3: router.push 未捕获 NavigationDuplicated
function goToUser(id: number) {
  router.push(`/user/${id}`)
}

export default router
