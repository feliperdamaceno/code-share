<script setup lang="ts">
import { ref } from 'vue'

import type { CartProduct } from '@code-share/shared/types/product'

import { RouterLink } from 'vue-router'

import ProductPrice from '@/components/features/catalog/ProductPrice.vue'
import Counter from '@/components/primitives/Counter.vue'

import { useCartStore } from '@/stores/cart.store'

import TrashIcon from '@/assets/icons/trash.svg'

const {
  id = '',
  title = '',
  slug = '',
  image = '',
  price,
  discount
} = defineProps<CartProduct>()

const cart = useCartStore()

const isLongTitle = title.length >= 40
</script>

<template>
  <div class="cart-item" aria-label="cart item">
    <img class="asset" :src="image" alt="" aria-hidden="true" />

    <div class="information">
      <div class="row">
        <RouterLink :to="`products/${slug}`">
          <h3 class="heading" :title="title" aria-hidden="true">
            {{ isLongTitle ? `${title.slice(0, 40)}...` : title }}
          </h3>
          <h3 class="visually-hidden">{{ title }}</h3>
        </RouterLink>

        <button
          class="delete-button"
          aria-label="remove item from cart"
          @click="cart.remove(id)"
        >
          <TrashIcon class="trash-icon" aria-hidden="true" />
        </button>
      </div>

      <div class="row">
        <Counter
          :min="1"
          :max="99"
          :initial="quantity"
          aria-label="product quantity selector"
          @increment="cart.increase(id)"
          @decrement="cart.decrease(id)"
        />

        <ProductPrice :price="price" :discount="discount" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.asset {
  position: relative;
  aspect-ratio: 4/3;
  inline-size: 100%;
  min-inline-size: 100px;
  max-inline-size: 100px;
  object-fit: cover;
  border-radius: var(--border-sm);
  background-color: var(--dark-6);
}

.asset::before {
  position: absolute;
  inset: 0;
  background-color: inherit;
  content: '';
}

@media (max-width: 400px) {
  .cart-item {
    flex-direction: column;
  }

  .asset {
    aspect-ratio: 4/2;
    max-inline-size: 100%;
  }
}

.information {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  inline-size: 100%;
  block-size: 100%;
  gap: var(--spacing-md);
}

.information .row {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.information .row:first-of-type {
  align-items: start;
}

.information .row:last-of-type {
  align-items: baseline;
}

.information a {
  text-decoration: none;
}

.information a:hover .heading {
  color: var(--color-accent-on-hover);
}

.information .heading {
  font-weight: var(--font-weight-medium);
  font-size: var(--text-md);
  text-wrap: pretty;
  transition-duration: 125ms;
  transition-property: color;
  transition-timing-function: ease;
}

.delete-button {
  display: grid;
  place-items: center;
  padding-inline: unset;
  padding-block: unset;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.trash-icon {
  width: 1.4rem;
  height: 1.4rem;
}

.trash-icon * {
  color: var(--gray-5);
  transition-duration: 150ms;
  transition-property: color;
  transition-timing-function: ease;
}

.trash-icon:hover * {
  color: var(--color-danger);
}
</style>
