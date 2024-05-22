import { createRouter, createWebHistory, createMemoryHistory  } from 'vue-router'
import PuzzleView from '../views/PuzzleView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/puzzle',
      name: 'puzzle',
      component: PuzzleView
    },
  ]
})

export default router
