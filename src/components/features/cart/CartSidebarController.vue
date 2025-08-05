<script setup lang="ts">
import CartSidebar from '@/components/features/cart/CartSidebar.vue'
</script>

<template>
  <Teleport to="body" aria-live="polite">
    <Transition name="sidebar">
      <CartSidebar v-if="false" />
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
