<script setup lang="ts">
import MinusIcon from '@/assets/icons/minus.svg'
import PlusIcon from '@/assets/icons/plus.svg'

type Props = {
  label?: string
  min?: number
  max?: number
}

const { label = undefined, min = 0, max = 99 } = defineProps<Props>()

const count = defineModel<number>({ default: 0 })

const decrease = () => {
  if (count.value <= min) return
  count.value--
}

const increase = () => {
  if (count.value >= max) return
  count.value++
}
</script>

<template>
  <div class="counter--base" :aria-label="label">
    <button class="decrease-button" @click="decrease">
      <MinusIcon class="minus-icon" aria-hidden="true" />
    </button>

    <input
      class="count"
      type="number"
      name="count"
      :min="min"
      :max="max"
      v-model="count"
    />

    <button class="increase-button" @click="increase">
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
  padding-inline: unset;
  padding-block: unset;
  border-inline-color: var(--light-3);
  border-inline-style: solid;
  border-inline-width: 1px;
  border-block: none;
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-small);
}

.count::-webkit-outer-spin-button,
.count::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.count {
  -moz-appearance: textfield;
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
