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
  border: none;
  background-color: transparent;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition-duration: 125ms;
  transition-property: background-color;
  transition-timing-function: ease;
}

.button.primary {
  border-radius: var(--border-sm);
  background-color: var(--dark-9);
  color: var(--color-text-on-dark);
}

.button.primary:hover {
  background-color: var(--dark-6);
}

.button.primary:focus-visible {
  outline-color: var(--dark-9);
}

.button.secondary {
  border-width: 0.1em;
  border-style: solid;
  border-radius: var(--border-rounded);
  border-color: var(--dark-6);
  transition-property: color, background-color;
}

.button.secondary:hover {
  background-color: var(--dark-6);
  color: var(--color-text-on-dark);
}

.button.secondary:focus-visible {
  outline-color: var(--dark-9);
}

.button.accent {
  border-radius: var(--border-sm);
  background-color: var(--color-accent);
  color: var(--color-text-on-dark);
}

.button.accent:hover {
  background-color: var(--color-accent-on-hover);
}

.button.small {
  padding-inline: var(--spacing-sm);
  padding-block: var(--spacing-xs);
  font-size: var(--text-sm);
}

.button.medium {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  font-size: var(--text-md);
}

.button.large {
  padding-inline: var(--spacing-lg);
  padding-block: var(--spacing-md);
  font-size: var(--text-lg);
}
</style>
