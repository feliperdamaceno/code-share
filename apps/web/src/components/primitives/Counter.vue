<script setup lang="ts">
import { ref } from 'vue'

import MinusIcon from '@/assets/icons/minus.svg'
import PlusIcon from '@/assets/icons/plus.svg'

const emit = defineEmits<{
  increment: []
  decrement: []
}>()

const {
  initial = 0,
  label = undefined,
  min = 0,
  max = 99
} = defineProps<{
  initial?: number
  label?: string
  min?: number
  max?: number
}>()

const count = ref(initial)

const increment = () => {
  if (count.value >= max) return
  count.value++
  emit('increment')
}

const decrement = () => {
  if (count.value <= min) return
  count.value--
  emit('decrement')
}
</script>

<template>
  <div class="counter--base" :aria-label="label">
    <button class="decrease-button" @click="decrement">
      <MinusIcon class="minus-icon" aria-hidden="true" />
    </button>

    <span class="count">{{ count }}</span>

    <button class="increase-button" @click="increment">
      <PlusIcon class="plus-icon" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.counter--base {
  display: flex;
  align-items: center;
  max-inline-size: fit-content;
  padding-block: 2px;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-xs);
  border-color: var(--light-3);
  background-color: var(--light-2);
}

.count {
  display: grid;
  place-items: center;
  inline-size: 3rem;
  border-inline-color: var(--light-3);
  border-inline-style: solid;
  border-inline-width: 1px;
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-small);
}

:is(.decrease-button, .increase-button) {
  display: grid;
  flex: 1;
  place-items: center;
  padding-inline: var(--spacing-sm);
  border: none;
  background-color: transparent;
  cursor: pointer;
}

:is(.decrease-button, .increase-button):focus-visible {
  outline-offset: -2px;
}

:is(.minus-icon, .plus-icon) {
  width: 1.2rem;
  height: 1.2rem;
}

:is(.minus-icon, .plus-icon) * {
  color: var(--color-accent);
}
</style>
