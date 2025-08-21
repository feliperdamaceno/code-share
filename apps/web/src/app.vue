<script lang="ts" setup>
import { onBeforeMount } from 'vue'

import CartSidebarController from '@/components/features/cart/CartSidebarController.vue'
import Footer from '@/components/layout/Footer.vue'
import Navigation from '@/components/layout/Navigation.vue'
import SkipToMainContent from '@/components/layout/SkipToMainContent.vue'

import { useProductStore } from '@/stores/product.store'

const products = useProductStore()

/* loading global data to ensure is available across the application */
onBeforeMount(() => products.load())
</script>

<template>
  <SkipToMainContent />

  <Navigation />

  <main id="main-content" class="page">
    <RouterView />
  </main>

  <Footer />

  <CartSidebarController />
</template>

<style scoped>
.page {
  display: grid;
  flex: 1;
  padding-inline: var(--spacing-md);
  gap: var(--spacing-2xl);
}
</style>
