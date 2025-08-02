<script setup lang="ts">
import MinusIcon from '@/assets/icons/minus.svg'
import PlusIcon from '@/assets/icons/plus.svg'

type Props = {
  label?: string
}

const { label = undefined } = defineProps<Props>()

const quantity = defineModel<number>({ default: 0 })

const decrease = () => {
  if (quantity.value <= 0) return
  quantity.value--
}

const increase = () => {
  quantity.value++
}
</script>

<template>
  <div class="counter--base" :aria-label="label">
    <button class="decrease-button" @click="decrease">
      <MinusIcon class="minus-icon" aria-hidden="true" />
    </button>

    <span class="value">{{ quantity }}</span>

    <button class="increase-button" @click="increase">
      <PlusIcon class="plus-icon" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.counter--base {
  background-color: var(--light-2);
  padding-block: var(--spacing-xs);
  border-color: var(--light-3);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-xs);
  display: flex;
  align-items: center;
  max-inline-size: fit-content;
}

.value {
  font-size: var(--text-lg);
  border-inline-color: var(--light-3);
  border-inline-width: 1px;
  border-inline-style: solid;
  display: grid;
  place-items: center;
  min-inline-size: 3rem;
}

:is(.decrease-button, .increase-button) {
  flex: 1;
  background-color: transparent;
  padding-inline: var(--spacing-sm);
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
}

:is(.minus-icon, .plus-icon) {
  width: 1.25rem;
  height: 1.25rem;
}

:is(.minus-icon, .plus-icon) * {
  color: var(--color-accent);
}
</style>
