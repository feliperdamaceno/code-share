<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

type Variants = 'primary' | 'secondary' | 'accent'

type Sizes = 'small' | 'medium' | 'large'

type Type = 'button' | 'submit' | 'reset'

type Rel =
  | 'alternate'
  | 'author'
  | 'bookmark'
  | 'external'
  | 'help'
  | 'license'
  | 'next'
  | 'nofollow'
  | 'noreferrer'
  | 'noopener'
  | 'prev'
  | 'search'
  | 'tag'

type Target = '_self' | '_blank' | '_parent' | '_top'

const {
  variant = 'primary',
  size = 'medium',
  type = 'button',
  href = undefined,
  rel = undefined,
  target = undefined
} = defineProps<{
  variant?: Variants
  size?: Sizes
  type?: Type
  href?: string
  rel?: Rel
  target?: Target
}>()

const isLink = href != null && href.length > 0

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
  <a
    v-if="isLink"
    class="button"
    :class="styles"
    :href="href"
    :rel="rel"
    :target="target"
  >
    <slot></slot>
  </a>

  <button v-else class="button" :class="styles" :type="type">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  display: block;
  max-width: fit-content;
  border: none;
  background-color: transparent;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-narrow);
  text-decoration: none;
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
