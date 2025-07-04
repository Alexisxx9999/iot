import { createRouter, createWebHistory } from 'vue-router'
import BienvenidaList from '../views/BienvenidaList.vue'
import BienvenidaAdmin from '../views/BienvenidaAdmin.vue'

const routes = [
  { path: '/', name: 'Bienvenida', component: BienvenidaList },
  { path: '/admin', name: 'AdminBienvenida', component: BienvenidaAdmin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router