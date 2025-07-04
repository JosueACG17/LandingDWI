import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Admin/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import DashboardView from '@/views/Admin/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: false},
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: { layout: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: true },
    },
  ],
})

export default router
