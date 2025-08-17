<script setup lang="ts">
import { computed, useSlots } from 'vue'

import type { HTMLAttributes } from 'vue'

type Sizes = 'small' | 'medium' | 'large'

type Props = {
  name?: string
  placeholder?: string
  label?: string
  size?: Sizes
  autocomplete?: 'on' | 'off'
  required?: boolean
}

const {
  name = 'textbox',
  placeholder = undefined,
  label = undefined,
  size = undefined,
  autocomplete = 'off',
  required = false
} = defineProps<Props>()

defineOptions({ inheritAttrs: false })

const value = defineModel<string>({ default: '' })

const slots = useSlots()
const hasLabel = !!(label || slots.default)

const styles: HTMLAttributes['class'] = computed(() => ({
  ['is-required']: required
}))

const rows = computed(() => {
  if (size === 'small') return 4
  if (size === 'medium') return 8
  if (size === 'large') return 12
  return size
})
</script>

<template>
  <div class="textbox--base" :class="styles">
    <label class="label" v-if="hasLabel" :for="name">
      <slot>{{ label }}</slot>
    </label>

    <textarea
      class="textbox"
      type="text"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :rows="rows"
      v-model="value"
      v-bind="$attrs"
    >
    {{ value }}
    </textarea>
  </div>
</template>

<style scoped>
.textbox--base {
  display: grid;
  inline-size: 100%;
  gap: var(--spacing-sm);
}

.textbox {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-xs);
  border-color: var(--light-3);
  background-color: var(--light-2);
  resize: none;
}

.is-required .label::before {
  content: '*';
  color: currentColor;
}

.label {
  display: flex;
  gap: var(--spacing-sm);
  color: currentColor;
  font-weight: var(--font-weight-medium);
  font-size: var(--text-md);
  cursor: pointer;
}
</style>
