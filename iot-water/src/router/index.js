import { createRouter, createWebHistory } from 'vue-router'
import NodeList from '../views/NodeList.vue'
import NodeCreate from '../views/NodeCreate.vue'
import NodeUpdate from '../views/NodeUpdate.vue'

const routes = [
  {
    path: '/',
    redirect: '/nodes'
  },
  {
    path: '/nodes',
    name: 'NodeList',
    component: NodeList
  },
  {
    path: '/nodes/create',
    name: 'NodeCreate',
    component: NodeCreate
  },
  {
    path: '/nodes/update/:id',
    name: 'NodeUpdate',
    component: NodeUpdate,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 