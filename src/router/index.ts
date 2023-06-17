import { getAuthToken, getOrg } from '@/helpers/service'
// import { inject } from 'vue'
// import type { VueCookies } from 'vue-cookies'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: async () => {
        if (getAuthToken()) return { name: 'overview', replace: true }
      },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/sign',
      name: 'sign',
      beforeEnter: async () => {
        if (getAuthToken()) return { name: 'overview', replace: true }
        if (!getOrg()) return { name: 'home', replace: true }
      },

      component: () => import('../views/SignView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/app',
      name: 'app',
      beforeEnter: async (to: any) => {
        if (!getAuthToken())
          return {
            name: 'sign',
            replace: true,
            query: {
              to: to.path
            }
          }
      },
      component: () => import('../components/Layout/App/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import('../views/app/OverviewView.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/app/SettingView.vue')
        }
      ]
    }
  ]
})

export default router
