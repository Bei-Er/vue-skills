import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default [
  {
    path: '/user',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('@/views/user/List.vue'),
        meta: { title: '用户列表' }
      },
      {
        path: ':id',
        name: 'UserDetail',
        component: () => import('@/views/user/Detail.vue'),
        meta: { title: '用户详情', requiresAuth: true },
        beforeEnter: (to, from, next) => {
          if (!/^\d+$/.test(to.params.id as string)) {
            return next({ name: 'NotFound' })
          }
          next()
        }
      },
      {
        path: ':id/settings',
        name: 'UserSettings',
        component: () => import('@/views/user/Settings.vue'),
        meta: { title: '用户设置', requiresAuth: true },
        alias: '/profile'
      },
      {
        path: ':id/posts',
        name: 'UserPosts',
        component: () => import('@/views/user/Posts.vue'),
        meta: { title: '用户帖子' }
      }
    ]
  }
]
