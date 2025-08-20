<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'

import type { Product } from '@code-share/shared/types/product'

import { useRoute } from 'vue-router'

import Button from '@/components/primitives/Button.vue'
import Counter from '@/components/primitives/Counter.vue'
import Pill from '@/components/primitives/Pill.vue'

import { formatPrice, getDiscountAmount } from '@/utils/ecomm'

import { useCartStore } from '@/stores/cart.store'

import LoadingIcon from '@/assets/icons/loading.svg'
import { useAsyncQuery } from '@/composables/useAsyncQuery'
import { ProductRequest } from '@/requests/product.request'

const route = useRoute()
const slug = Array.isArray(route.params.slug)
  ? route.params.slug[0]
  : route.params.slug

const {
  data: product,
  loading,
  error,
  load
} = useAsyncQuery<Product>(slug, async () => {
  return await ProductRequest.getProductBySlug(slug)
})

onBeforeMount(async () => await load())

const cart = useCartStore()

const status = computed(() => {
  return product.value.available ? 'Add to Cart' : 'Out of Stock'
})

const discountAmount = computed(() =>
  getDiscountAmount({
    price: product.value.price,
    discount: product.value.discount.percentage
  })
)
</script>

<template>
  <section>
    <LoadingIcon class="loading" v-if="loading" />

    <p class="error" v-else-if="error">
      Ops! Something went wrong while loading this product, please try again
      later.
    </p>

    <div class="product" v-else>
      <div class="column">
        <img
          :src="product.images[0].src"
          :alt="product.images[0].alt"
          :width="product.images[0].width"
          :height="product.images[0].height"
          :key="product.images[0].id"
        />
      </div>

      <div class="column">
        <div class="heading">
          <p class="eyebrow">{{ product.author }}</p>
          <h2 class="title">{{ product.title }}</h2>
        </div>

        <p class="description">{{ product.description }}</p>

        <div class="price">
          <div class="group">
            <strong class="value">
              <span
                v-if="product.discount.percentage > 0"
                aria-label="current price"
              >
                {{ formatPrice({ value: product.price - discountAmount }) }}
              </span>

              <span v-else>{{ formatPrice({ value: product.price }) }}</span>
            </strong>

            <Pill v-if="product.discount.percentage > 0" aria-label="discount">
              &#45;{{ product.discount.percentage }}&#37;
            </Pill>
          </div>

          <p
            v-if="discountAmount > 0"
            class="discount"
            aria-label="original price"
          >
            {{ formatPrice({ value: product.price }) }}
          </p>
        </div>

        <div class="actions">
          <Counter
            :min="1"
            :max="99"
            :initial="cart.read(product.id)?.quantity"
            aria-label="product quantity selector"
            @increment="cart.increase(product.id)"
            @decrement="cart.decrease(product.id)"
          />

          <Button
            variant="accent"
            :disabled="!product.available"
            :aria-pressed="cart.hasProduct(product.id)"
            @click="cart.add(product)"
          >
            {{ status }}
          </Button>
        </div>

        <div class="categories" aria-label="product categories">
          <Pill v-for="category in product.categories" :key="category.id">
            {{ category.name }}
          </Pill>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xl);
}

@media (800px >= width) {
  .product {
    flex-direction: column-reverse;
  }
}

.column {
  display: grid;
  flex: min(300px, 100%);
  align-content: start;
  gap: var(--spacing-lg);
}

.heading {
  display: grid;
  gap: var(--spacing-sm);
}

.heading .eyebrow {
  color: var(--gray-5);
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-small);
  text-transform: uppercase;
}

.heading .title {
  text-wrap: pretty;
}

.description {
  color: var(--gray-5);
  font-weight: var(--font-weight-medium);
}

.price {
  display: grid;
  gap: var(--spacing-xs);
}

.price .group {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.price .value {
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-4xl);
}

.price .discount {
  color: var(--gray-5);
  font-size: var(--text-lg);
  text-decoration: line-through;
}

:is(.actions, .categories) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

:is(.loading, .error) {
  margin-inline: auto;
}

.error {
  color: var(--color-danger);
  font-weight: var(--font-weight-bold);
}
</style>
