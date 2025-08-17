<script setup lang="ts">
import { computed, ref } from 'vue'

import type { CatalogProduct } from '@code-share/shared/types/product'

import { RouterLink } from 'vue-router'

import ProductPrice from '@/components/features/catalog/ProductPrice.vue'
import Button from '@/components/primitives/Button.vue'

import { useCartStore } from '@/stores/cart.store'

const emit = defineEmits<{
  'add-to-cart': []
}>()

const {
  id = '',
  title = '',
  slug = '',
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
      <RouterLink :to="`products/${slug}`">
        <h3 class="heading" :title="title" aria-hidden="true">
          {{ isLongTitle ? `${title.slice(0, 50)}...` : title }}
        </h3>
        <h3 class="visually-hidden">{{ title }}</h3>
      </RouterLink>

      <ProductPrice :price="price" :discount="discount" />

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

.information a {
  text-decoration: none;
}

.information .heading {
  font-size: var(--text-lg);
  text-wrap: pretty;
}

.information .cta {
  max-inline-size: 100%;
  margin-block-start: auto;
}
</style>
