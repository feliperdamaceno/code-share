<script lang="ts" setup>
import Navigation from '@/components/ui/Navigation.vue'
</script>

<template>
  <div class="page">
    <Navigation />

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.page {
  margin-inline: auto;
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-xl);
  max-inline-size: var(--page-container);
  display: grid;
  gap: var(--spacing-xl);
}

.content {
  padding-inline: var(--spacing-md);
  display: grid;
  gap: var(--spacing-xl);
}
</style>
