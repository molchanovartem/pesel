import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/featured',
    name: 'Featured',
    component: () => import('../views/Featured.vue')
  },
  {
    path: '/:breed',
    name: 'Breed',
    component: () => import('../views/Breed.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
