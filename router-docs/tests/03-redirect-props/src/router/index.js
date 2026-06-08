import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: () => import('@/views/user/Detail.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
    props: { highlight: true }
  },
  {
    path: '/article/:slug',
    name: 'Article',
    component: () => import('@/views/Article.vue'),
    props: (route) => ({ slug: route.params.slug, page: Number(route.query.page) || 1 })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
