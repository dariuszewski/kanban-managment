import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useUserStore } from "@/stores/user"

import LoginRegisterView from '../views/LoginRegisterView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectView from '../views/ProjectView.vue'
import ForbiddenView from '../views/ForbiddenView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import ManageView from '../views/ManageView.vue'
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
      redirect: { name: 'projects' },
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
      meta: {requiresAuth: false}
    },
    {
      path: '/project/:id',
      name: 'project',
      props: true,
      component: ProjectView,
      meta: {requiresAuth: true},
      // MOVED TO VIEW
      // beforeEnter: (to, from, next) => {
      //   // get current project
      //   const projectId = to.params.id
      //   const currentProject = projectsMock.filter(p => p.id == projectId).pop()
      //   if (!currentProject) {
      //     // if project doesn't exist return 404
      //     next({ name: 'notFound' })
      //   }
      //   // get user and check if participates in a project
      //   const userId = userStore.user.id || null
      //   console.log(userId)
      //   const userBelongsToProject = currentProject.participants.includes(userId)
      //   // return a route
      //   if (userBelongsToProject) {
      //     next()
      //   } else {
      //     next({ name: 'forbidden' })
      //   }
      // }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
    },
    {
      path: '/notfound',
      name: 'notFound',
      component: NotFoundView,
    },
    {
      path: '/manage/:id',
      name: 'manage',
      component: ManageView,
      props: true,
      beforeEnter: (to, from, next) => {
        // get current project
        const projectId = to.params.id
        const currentProject = projectsMock.filter(p => p.id == projectId).pop()
        if (!currentProject) {
          // if project doesn't exist return 404
          next({ name: 'notFound' })
        }
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
  ]
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore(pinia)
  if (to.meta && to.meta.requiresAuth && !authStore.isAuthenticated && !to.fullPath.includes('login')) {
    console.log("redirecting unautheticated user")
    return {
      path: '/login',
    }
  }
})

export default router
