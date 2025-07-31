<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

type Variants = 'primary' | 'secondary' | 'accent'
type Sizes = 'small' | 'medium' | 'large'

const { variant = 'primary', size = 'medium' } = defineProps<{
  variant?: Variants
  size?: Sizes
}>()

const styles: HTMLAttributes['class'] = {
  ['primary']: variant === 'primary',
  ['secondary']: variant === 'secondary',
  ['accent']: variant === 'accent',
  ['small']: size === 'small',
  ['medium']: size === 'medium',
  ['large']: size === 'large'
}
</script>

<template>
  <button class="button" :class="styles">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  font-weight: var(--font-weight-medium);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition-property: background-color;
  transition-timing-function: ease;
  transition-duration: 125ms;
}

.button.primary {
  color: var(--light-2);
  background-color: var(--dark-9);
  border-radius: var(--border-sm);
}

.button.primary:hover {
  background-color: var(--dark-6);
}

.button.primary:focus-visible {
  outline-color: var(--dark-9);
}

.button.secondary {
  border-color: var(--dark-6);
  border-style: solid;
  border-width: 0.1em;
  border-radius: var(--border-rounded);
  transition-property: color, background-color;
}

.button.secondary:hover {
  color: var(--light-2);
  background-color: var(--dark-6);
}

.button.secondary:focus-visible {
  outline-color: var(--dark-9);
}

.button.accent {
  color: var(--light-2);
  background-color: var(--color-accent);
  border-radius: var(--border-sm);
}

.button.accent:hover {
  background-color: var(--color-accent-on-hover);
}

.button.small {
  font-size: var(--text-sm);
  padding-inline: var(--spacing-sm);
  padding-block: var(--spacing-xs);
}

.button.medium {
  font-size: var(--text-md);
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
}

.button.large {
  font-size: var(--text-lg);
  padding-inline: var(--spacing-lg);
  padding-block: var(--spacing-md);
}
</style>
