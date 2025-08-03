<script setup lang="ts">
import { TransitionGroup, computed } from 'vue'

import type { HTMLAttributes } from 'vue'

import ChevronDownIcon from '@/assets/icons/chevron-down.svg'
import ChevronUpIcon from '@/assets/icons/chevron-up.svg'

defineProps<{
  title: string
}>()

const open = defineModel<boolean>({ default: false })

const toggle = () => {
  open.value = !open.value
}

const styles: HTMLAttributes['class'] = computed(() => ({
  ['is-opened']: open.value
}))
</script>

<template>
  <details :class="styles" :open="open" @toggle="toggle">
    <summary class="title">
      <span>{{ title }}</span>

      <TransitionGroup class="icons" name="toggle" tag="div">
        <ChevronUpIcon v-if="open" class="open-icon" aria-hidden="true" />
        <ChevronDownIcon v-else class="closed-icon" aria-hidden="true" />
      </TransitionGroup>
    </summary>

    <div class="items">
      <slot></slot>
    </div>
  </details>
</template>

<style scoped>
.title {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  justify-content: space-between;
  cursor: pointer;
}

.title::marker {
  content: '';
}

.icons {
  display: grid;
  place-content: center;
}

:is(.open-icon, .closed-icon) {
  width: 2rem;
  height: 2rem;
  grid-area: 1 / 1;
}

:is(.open-icon, .closed-icon) * {
  color: var(--color-text);
  stroke-width: 1.5px;
}

.toggle-enter-active,
.toggle-leave-active {
  transition-property: opacity;
  transition-timing-function: ease;
  transition-duration: 125ms;
}

.toggle-enter-from,
.toggle-leave-to {
  opacity: 0;
}

.items {
  display: grid;
  gap: var(--spacing-sm);
  margin-block-start: var(--spacing-sm);
}
</style>
