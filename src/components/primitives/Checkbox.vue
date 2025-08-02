<script setup lang="ts">
import { computed, useSlots } from 'vue'

import type { HTMLAttributes } from 'vue'

import CheckIcon from '@/assets/icons/check.svg'

type Props = {
  name?: string
  label?: string
  value?: string
}

const {
  name = 'checkbox',
  label = undefined,
  value = 'on'
} = defineProps<Props>()

defineOptions({
  inheritAttrs: false
})

const checked = defineModel<boolean>()

const slots = useSlots()
const hasLabel = !!(label || slots.default)

const onInput = () => {
  checked.value = !checked.value
}

const styles: HTMLAttributes['class'] = computed(() => ({
  ['is-checked']: checked.value
}))
</script>

<template>
  <div class="checkbox--base">
    <div class="checkbox" :class="styles">
      <input
        type="checkbox"
        class="input"
        :id="name"
        :name="name"
        :checked="checked"
        :value="value"
        @input="onInput"
        v-bind="$attrs"
      />

      <div class="check-icon">
        <Transition name="checked">
          <CheckIcon aria-hidden="true" v-show="checked" />
        </Transition>
      </div>
    </div>

    <label class="label" v-if="hasLabel" :for="name">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<style scoped>
.checkbox--base {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  max-inline-size: fit-content;
}

.checkbox {
  position: relative;
  background-color: var(--light-2);
  border-color: var(--light-3);
  border-radius: var(--border-xs);
  border-width: 1px;
  border-style: solid;
  transition-property: border-color, background-color;
  transition-timing-function: ease;
  transition-duration: 125ms;
}

.checkbox:has(> .input:focus-visible) {
  outline-color: var(--color-focus);
  outline-style: solid;
  outline-width: 2px;
  outline-offset: 2px;
}

.input {
  cursor: pointer;
  opacity: 0;
  margin: 0;
  position: absolute;
  inset: 0;
  z-index: 1;
}

.is-checked {
  border-color: var(--color-accent);
  background-color: var(--color-accent);
}

.check-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.check-icon * {
  color: var(--color-text-on-dark);
}

.checked-enter-active,
.checked-leave-active {
  transition-property: opacity;
  transition-timing-function: ease;
  transition-duration: 125ms;
}

.checked-enter-from,
.checked-leave-to {
  opacity: 0;
}

.label {
  color: var(--gray-5);
  font-size: var(--text-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}
</style>
