import { createRouter, createWebHashHistory } from 'vue-router'
import Article1 from '../views/Article1.vue'
import Article2 from '../views/Article2.vue'

const routes = [
  {
    path: '/',
    name: 'Article1',
    component: Article1
  },
  {
    path: '/content',
    name: 'Article2',
    component: Article2
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
