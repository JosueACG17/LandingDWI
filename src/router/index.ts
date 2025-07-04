import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Admin/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import DashboardView from '@/views/Admin/DashboardView.vue'
import UsersView from '@/views/Admin/UsersView.vue'
import { authService } from '@/services/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: false, public: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: false, public: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: { layout: false, public: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: true, requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: { layout: true, requiresAuth: true },
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = await authService.verifyToken()
    if (!isAuthenticated) {
      return next('/login')
    }
  }

  if (to.path === '/login') {
    const isAuthenticated = await authService.verifyToken()
    if (isAuthenticated) {
      return next('/dashboard')
    }
  }

  next()
})

export default router
