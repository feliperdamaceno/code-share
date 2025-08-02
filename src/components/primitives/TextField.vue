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

defineOptions({
  inheritAttrs: false
})

const value = defineModel<string>()

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
      :value="value"
      :required="required"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped>
.textfield--base {
  display: grid;
  gap: var(--spacing-sm);
  max-inline-size: 100%;
}

.input {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  background-color: var(--light-2);
  border-color: var(--light-3);
  border-radius: var(--border-xs);
  border-width: 1px;
  border-style: solid;
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
