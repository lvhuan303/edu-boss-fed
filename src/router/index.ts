import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'createMenu',
        component: () => import(/* webpackChunkName: 'createMenu' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'editMenu',
        component: () => import(/* webpackChunkName: 'createMenu' */ '@/views/menu/edit.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/resource/cate',
        name: 'resourceCate',
        component: () => import(/* webpackChunkName: 'resourceCate' */ '@/views/resource/cate.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log(to.fullPath)
    if (!store.state.user) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'login' && store.state.user) {
      next('/')
    } else {
      // 确保一定要调用 next()
      next()
    }
  }
})

export default router
