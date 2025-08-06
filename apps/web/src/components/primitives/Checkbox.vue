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

defineOptions({ inheritAttrs: false })

const checked = defineModel<boolean>({ default: false })

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
  max-inline-size: fit-content;
  gap: var(--spacing-sm);
}

.checkbox {
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-xs);
  border-color: var(--light-3);
  background-color: var(--light-2);
  transition-duration: 125ms;
  transition-property: border-color, background-color;
  transition-timing-function: ease;
}

.checkbox:has(> .input:focus-visible) {
  outline-color: var(--color-focus);
  outline-style: solid;
  outline-width: 2px;
  outline-offset: 2px;
}

.input {
  z-index: 1;
  position: absolute;
  margin: 0;
  inset: 0;
  cursor: pointer;
  opacity: 0;
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
  transition-duration: 125ms;
  transition-property: opacity;
  transition-timing-function: ease;
}

.checked-enter-from,
.checked-leave-to {
  opacity: 0;
}

.label {
  color: var(--gray-5);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-md);
  cursor: pointer;
}
</style>
