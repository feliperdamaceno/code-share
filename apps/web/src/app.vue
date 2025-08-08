<script lang="ts" setup>
import CartSidebarController from '@/components/features/cart/CartSidebarController.vue'
import Footer from '@/components/layout/Footer.vue'
import Navigation from '@/components/layout/Navigation.vue'
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
