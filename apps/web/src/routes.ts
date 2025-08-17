import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import Catalog from '@/pages/Catalog.vue'
import Contact from '@/pages/Contact.vue'
import Home from '@/pages/Home.vue'
import Product from '@/pages/Product.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Catalog',
    path: '/catalog',
    component: Catalog
  },
  {
    name: 'Contact',
    path: '/contact',
    component: Contact
  },
  {
    path: '/products/:slug',
    component: Product
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
