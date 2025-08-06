<script setup lang="ts">
import CartSidebar from '@/components/features/cart/CartSidebar.vue'

import { useCartSidebarStore } from '@/stores/cart'

const sidebar = useCartSidebarStore()
</script>

<template>
  <Teleport to="body" aria-live="polite">
    <Transition name="sidebar">
      <CartSidebar v-if="sidebar.open" @close="sidebar.toggle" />
    </Transition>
  </Teleport>
</template>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition-duration: 200ms;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
