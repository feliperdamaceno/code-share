<script setup lang="ts">
import { ref } from 'vue'

import ChevronDownIcon from '@/assets/icons/chevron-down.svg'
import ChevronUpIcon from '@/assets/icons/chevron-up.svg'

const props = defineProps<{
  title: string
  open?: boolean
}>()

const open = ref(props.open || false)
const uuid = crypto.randomUUID()

const toggle = () => (open.value = !open.value)
</script>

<template>
  <section class="accordion">
    <button
      class="heading"
      :id="`heading-${uuid}`"
      :aria-controls="`panel-${uuid}`"
      :aria-expanded="open"
      @click="toggle"
    >
      <span>{{ title }}</span>

      <TransitionGroup class="icons" name="heading" tag="span">
        <ChevronUpIcon v-if="open" class="open-icon" aria-hidden="true" />
        <ChevronDownIcon v-else class="closed-icon" aria-hidden="true" />
      </TransitionGroup>
    </button>

    <Transition name="panel">
      <div
        :aria-labelledby="`heading-${uuid}`"
        :id="`panel-${uuid}`"
        class="panel"
        role="region"
        v-if="open"
      >
        <slot></slot>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.accordion {
  inline-size: 100%;
}

.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
  padding-inline: 0;
  padding-block: 0;
  gap: var(--spacing-md);
  border: 0;
  background-color: transparent;
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-lg);
  cursor: pointer;
}

.icons {
  display: grid;
  place-content: center;
}

:is(
  .heading-enter-active,
  .heading-leave-active,
  .panel-enter-active,
  .panel-leave-active
) {
  transition-duration: 125ms;
  transition-property: opacity;
  transition-timing-function: ease;
}

:is(
  .heading-enter-from,
  .heading-leave-to,
  .panel-enter-from,
  .panel-leave-to
) {
  opacity: 0;
}

:is(.open-icon, .closed-icon) {
  grid-area: 1 / 1;
  width: 2rem;
  height: 2rem;
}

:is(.open-icon, .closed-icon) * {
  color: var(--color-text);
  stroke-width: 1.5px;
}

.panel {
  display: grid;
  margin-block-start: var(--spacing-sm);
  gap: var(--spacing-sm);
}
</style>
