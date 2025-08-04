<script setup lang="ts">
import { ref } from 'vue'

import Button from '@/components/primitives/Button.vue'

import { formatPrice } from '@/utils/ecomm'

const {
  src = '',
  title = '',
  price,
  available
} = defineProps<{
  src: string
  title: string
  price: number
  available: boolean
}>()

const invalidSrc = ref<boolean>(false)
const isLongTitle = title.length >= 50
</script>

<template>
  <div class="card">
    <img
      class="asset"
      :class="{ invalid: invalidSrc }"
      :src="src"
      alt=""
      aria-hidden="true"
      @error="invalidSrc = true"
    />

    <div class="information">
      <div>
        <h3 class="heading" :title="title" aria-hidden="true">
          {{ isLongTitle ? `${title.slice(0, 50)}...` : title }}
        </h3>
        <h3 class="visually-hidden">{{ title }}</h3>
      </div>

      <strong class="price">{{ formatPrice({ value: price }) }}</strong>
      <p v-if="available === false" class="availability">Out of Stock</p>
      <Button class="cta" variant="accent">Add to Cart</Button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-sm);
  border-color: var(--light-3);
  background-color: var(--light-2);
}

.asset {
  position: relative;
  aspect-ratio: 3/2;
  inline-size: 100%;
  object-fit: cover;
  background-color: var(--dark-6);
}

.asset.invalid::before {
  position: absolute;
  inset: 0;
  background-color: inherit;
  content: '';
}

.information {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-md);
  gap: var(--spacing-sm);
}

.information .heading {
  font-size: var(--text-lg);
  text-wrap: pretty;
}

.information .price {
  font-weight: var(--font-weight-medium);
  font-size: var(--text-xl);
  font-family: var(--font-heading);
}

.information .availability {
  color: var(--gray-5);
  font-weight: var(--font-weight-medium);
}

.information .cta {
  max-inline-size: 100%;
  margin-block-start: auto;
}
</style>
