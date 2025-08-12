<script lang="ts" setup>
import { onBeforeMount } from 'vue'

import CartSidebarController from '@/components/features/cart/CartSidebarController.vue'
import Footer from '@/components/layout/Footer.vue'
import Navigation from '@/components/layout/Navigation.vue'

import { useProductStore } from '@/stores/product.store'

const products = useProductStore()

/* loading global data to ensure is available across the application */
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
