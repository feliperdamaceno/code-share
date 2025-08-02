<script setup lang="ts">
import { computed, useSlots } from 'vue'

import type { HTMLAttributes } from 'vue'

type Sizes = 'small' | 'medium' | 'large'

type Props = {
  name?: string
  placeholder?: string
  label?: string
  size?: Sizes
  required?: boolean
}

const {
  name = 'textbox',
  placeholder = undefined,
  label = undefined,
  size = undefined,
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
  gap: var(--spacing-sm);
  inline-size: 100%;
}

.textbox {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  background-color: var(--light-2);
  border-color: var(--light-3);
  border-radius: var(--border-xs);
  border-width: 1px;
  border-style: solid;
  resize: none;
}

.is-required .label::before {
  content: '*';
  color: currentColor;
}

.label {
  color: currentColor;
  font-size: var(--text-md);
  font-weight: var(--font-weight-medium);
  display: flex;
  gap: var(--spacing-sm);
  cursor: pointer;
}
</style>
