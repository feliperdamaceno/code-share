<script setup lang="ts">
import { ref } from 'vue'

import type { Image } from '@code-share/shared/types/assets'

const { name, images } = defineProps<{
  name: string
  images: Image[]
}>()

const selected = ref(images[0])

const select = (image: Image) => {
  selected.value = image
}

const onKeyDown = (event: KeyboardEvent, image: Image) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    select(image)
  }
}
</script>

<template>
  <section
    role="regions"
    :id="`carousel-${name}`"
    class="carousel"
    aria-label="product images carousel"
  >
    <div class="selected" aria-label="selected image" aria-live="polite">
      <Transition name="selected">
        <img
          class="asset"
          :src="selected.src"
          :alt="selected.alt"
          :width="selected.width"
          :height="selected.height"
          :key="selected.id"
        />
      </Transition>
    </div>

    <ul role="listbox" class="controls" :aria-controls="`carousel-${name}`">
      <li
        v-for="image in images"
        role="option"
        class="option"
        :key="image.id"
        :tabindex="0"
        :aria-selected="selected.id === image.id"
        @click="select(image)"
        @keydown="(event) => onKeyDown(event, image)"
      >
        <img
          class="asset"
          :src="image.src"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.carousel {
  display: grid;
}

:is(.selected, .asset) {
  aspect-ratio: 4/3;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.selected-enter-active,
.selected-leave-active {
  transition: opacity 125ms ease;
}

.selected-enter-from,
.selected-leave-to {
  opacity: 0;
}

.asset {
  position: relative;
  object-fit: cover;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-sm);
  border-color: var(--light-3);
  background-color: var(--dark-6);
}

.asset::before {
  position: absolute;
  inset: 0;
  background-color: inherit;
  content: '';
}

.controls {
  display: grid;
  grid-auto-columns: 8rem;
  grid-auto-flow: column;
  margin-block: 0;
  padding-inline-start: 0;
  padding-block: var(--spacing-md);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  gap: var(--spacing-md);
  list-style: none;
  scroll-snap-type: inline mandatory;
}

.controls .option {
  border-radius: var(--border-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition-duration: 125ms;
  transition-property: translate;
  transition-timing-function: ease;
}

.controls .option:hover {
  translate: 0 -0.25rem;
}
</style>
