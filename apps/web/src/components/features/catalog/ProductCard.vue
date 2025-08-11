<script setup lang="ts">
import { computed, ref } from 'vue'

import Button from '@/components/primitives/Button.vue'

import { formatPrice } from '@/utils/ecomm'

import { useCartStore } from '@/stores/cart.store'

const emit = defineEmits<{
  'add-to-cart': []
}>()

const {
  id = '',
  image: src = '',
  title = '',
  price,
  available
} = defineProps<{
  id: string
  title: string
  image: string
  price: number
  available: boolean
}>()

const cart = useCartStore()

const invalidSrc = ref<boolean>(false)
const isLongTitle = title.length >= 50

const status = computed(() => {
  if (cart.inCart(id)) return 'In Cart'
  if (available === true) return 'Add to Cart'
  if (available === false) return 'Out of Stock'
})
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

      <Button
        class="cta"
        variant="accent"
        :disabled="!available"
        :aria-pressed="cart.inCart(id)"
        @click="emit('add-to-cart')"
      >
        {{ status }}
      </Button>

      <span v-if="cart.inCart(id)" class="visually-hidden" aria-live="polite">
        Item added to cart
      </span>
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
  aspect-ratio: 4/2;
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

.information .cta {
  max-inline-size: 100%;
  margin-block-start: auto;
}
</style>
