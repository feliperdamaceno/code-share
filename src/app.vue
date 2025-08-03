<script lang="ts" setup>
import Navigation from '@/components/ui/Navigation.vue'
</script>

<template>
  <Navigation />

  <main class="content">
    <RouterView />
  </main>
</template>

<style scoped>
.content {
  display: grid;
  flex: 1;
  padding-inline: var(--spacing-md);
  gap: var(--spacing-xl);
}
</style>
