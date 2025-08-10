<script lang="ts" setup>
import { onBeforeMount } from 'vue'

import CartSidebarController from '@/components/features/cart/CartSidebarController.vue'
import Footer from '@/components/layout/Footer.vue'
import Navigation from '@/components/layout/Navigation.vue'

import { useProductStore } from '@/stores/product.store'

/* loading global data to ensure is available across the application */
const products = useProductStore()
onBeforeMount(() => products.load())
</script>

<template>
  <Navigation />

  <main class="content">
    <RouterView />
  </main>

  <Footer />

  <CartSidebarController />
</template>

<style scoped>
.content {
  display: grid;
  flex: 1;
  gap: var(--spacing-xl);
}
</style>
