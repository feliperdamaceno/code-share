import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'

export const routes: RouteRecordRaw[] = [
  { name: 'Home', path: '/', component: Home }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
