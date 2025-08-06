<script setup lang="ts">
import { computed, useSlots } from 'vue'

import type { HTMLAttributes } from 'vue'

type Props = {
  name?: string
  placeholder?: string
  label?: string
  required?: boolean
}

const {
  name = 'textfield',
  placeholder = undefined,
  label = undefined,
  required = false
} = defineProps<Props>()

defineOptions({ inheritAttrs: false })

const value = defineModel<string>({ default: '' })

const slots = useSlots()
const hasLabel = !!(label || slots.default)

const styles: HTMLAttributes['class'] = computed(() => ({
  ['is-required']: required
}))
</script>

<template>
  <div class="textfield--base" :class="styles">
    <label class="label" v-if="hasLabel" :for="name">
      <slot>{{ label }}</slot>
    </label>

    <input
      class="input"
      type="text"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      v-model="value"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped>
.textfield--base {
  display: grid;
  inline-size: 100%;
  gap: var(--spacing-sm);
}

.input {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-xs);
  border-color: var(--light-3);
  background-color: var(--light-2);
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
