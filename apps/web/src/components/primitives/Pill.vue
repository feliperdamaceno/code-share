<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const { size = 'regular' } = defineProps<{
  size?: 'small' | 'regular'
}>()

const styles: HTMLAttributes['class'] = {
  ['small']: size === 'small'
}
</script>

<template>
  <span class="pill" :class="styles">
    <slot></slot>
  </span>
</template>

<style scoped>
.pill {
  display: inline-flex;
  padding-inline: 0.5em;
  padding-block: 0.1em;
  border-radius: var(--border-xs);
  background-color: var(--dark-6);
  color: var(--color-text-on-dark);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-small);
}

.pill.small {
  font-size: 0.75em;
}
</style>
