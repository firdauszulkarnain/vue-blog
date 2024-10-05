import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import DetailPost from '@/views/DetailPost.vue'
import Categories from '@/views/Categories.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailPost,
	props: true
  },{
    path: '/categories',
    name: 'category',
    component: Categories
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
