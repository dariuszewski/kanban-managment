import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useUserStore } from "@/stores/user"

import HomeView from '../views/HomeView.vue'
import LoginRegisterView from '../views/LoginRegisterView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectView from '../views/ProjectView.vue'
import ForbiddenView from '../views/ForbiddenView.vue'
import AccountView from '../views/AccountView.vue'


import projectsMock from "@/projectsMock.js"
import { useAuthStore } from '../stores/useAuthStore'
const pinia = createPinia()
const userStore = useUserStore(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginRegisterView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {requiresAuth: true}
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: {requiresAuth: true}
    },
    {
      path: '/projects/:id',
      name: 'project',
      props: true,
      component: ProjectView,
      meta: {requiresAuth: true},
      beforeEnter: (to, from, next) => {
        // get current project
        const projectId = to.params.id
        const currentProject = projectsMock.filter(p => p.id == projectId).pop()
        // TODO: Add if not currentProject then Not Found
        // get user and check if participates in a project
        const userId = userStore.user.id || null
        const userBelongsToProject = currentProject.participants.includes(userId)
        // return a route
        if (userBelongsToProject) {
          next()
        } else {
          next({ name: 'forbidden' })
        }
      }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
  ]
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore(pinia)
  if (to.meta && to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log("redirecting unautheticated user")
    return {
      path: '/login',
    }
  }
})

export default router
