<script setup lang="ts">
import { computed, ref } from 'vue'

import type { CatalogProduct } from '@code-share/shared/types/product'

import Button from '@/components/primitives/Button.vue'

import { formatPrice, getDiscountAmount } from '@/utils/ecomm'

import { useCartStore } from '@/stores/cart.store'

const emit = defineEmits<{
  'add-to-cart': []
}>()

const {
  id = '',
  title = '',
  image = '',
  price,
  discount,
  available
} = defineProps<CatalogProduct>()

const cart = useCartStore()

const invalidSrc = ref<boolean>(false)
const isLongTitle = title.length >= 50

const status = computed(() => {
  return available ? 'Add to Cart' : 'Out of Stock'
})

const discountAmount = getDiscountAmount({
  price,
  discount: discount.percentage
})
</script>

<template>
  <div class="card">
    <img
      class="asset"
      :class="{ invalid: invalidSrc }"
      :src="image"
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

      <strong class="price">
        <span :class="{ discounted: discountAmount > 0 }">
          {{ formatPrice({ value: price }) }}
        </span>

        <span v-if="discountAmount > 0">
          {{ formatPrice({ value: price - discountAmount }) }}
        </span>

        <span v-if="discount.percentage" class="percentage">
          &#45;{{ discount.percentage }}&#37;
        </span>
      </strong>

      <Button
        class="cta"
        variant="accent"
        :disabled="!available"
        :aria-pressed="cart.hasProduct(id)"
        @click="emit('add-to-cart')"
      >
        {{ status }}
      </Button>

      <span class="visually-hidden" aria-live="polite">
        {{ cart.hasProduct(id) ? 'Item added to cart' : '' }}
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
  display: flex;
  align-items: center;
  gap: 0.5ch;
  font-weight: var(--font-weight-medium);
  font-size: var(--text-xl);
  font-family: var(--font-heading);
}

.information .discounted {
  color: var(--color-danger);
  font-size: var(--text-small);
  text-decoration: line-through;
}

.information .percentage {
  padding-inline: 0.5em;
  padding-block-start: 0.15em;
  padding-block-end: 0.125em;
  border-radius: var(--border-rounded);
  background-color: var(--color-success);
  color: var(--light-2);
  font-size: 0.875rem;
  line-height: 1;
}

.information .cta {
  max-inline-size: 100%;
  margin-block-start: auto;
}
</style>
