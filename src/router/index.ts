import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/sign',
      name: 'sign',
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
      component: () => import('../components/Layout/App/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import('../views/app/OverviewView.vue')
        }
      ]
    }
  ]
})

export default router
