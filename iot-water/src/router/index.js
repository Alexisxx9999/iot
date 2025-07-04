import { createRouter, createWebHistory } from 'vue-router'
import MedidorList from '../views/MedidorList.vue'
import MedidorCreate from '../views/MedidorCreate.vue'
import MedidorEdit from '../views/MedidorEdit.vue'
import MedidorDetail from '../views/MedidorDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/medidores'
  },
  {
    path: '/medidores',
    name: 'MedidorList',
    component: MedidorList,
    meta: { title: 'Lista de Medidores' }
  },
  {
    path: '/medidores/crear',
    name: 'MedidorCreate',
    component: MedidorCreate,
    meta: { title: 'Crear Medidor' }
  },
  {
    path: '/medidores/:id',
    name: 'MedidorDetail',
    component: MedidorDetail,
    meta: { title: 'Detalle del Medidor' }
  },
  {
    path: '/medidores/:id/editar',
    name: 'MedidorEdit',
    component: MedidorEdit,
    meta: { title: 'Editar Medidor' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/medidores'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardia de navegación para actualizar el título de la página
router.beforeEach((to, from, next) => {
  // Actualizar el título de la página
  if (to.meta.title) {
    document.title = `${to.meta.title} - Sistema de Medidores IoT`
  } else {
    document.title = 'Sistema de Medidores IoT'
  }
  
  // Scroll al inicio de la página
  window.scrollTo(0, 0)
  
  next()
})

export default router 