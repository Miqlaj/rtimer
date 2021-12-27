import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (
    to.name !== 'Settings' &&
    (
      localStorage.getItem("auth.apiUrl") == null || 
      localStorage.getItem("auth.apiUrl") == "" ||
      localStorage.getItem("auth.apiKey") == null ||
      localStorage.getItem("auth.apiKey") == ""
    )
  )
    next({ name: 'Settings' })
  else
    next()
})

export default router
