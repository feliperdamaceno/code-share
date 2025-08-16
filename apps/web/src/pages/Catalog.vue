<script setup lang="ts">
import type { Product } from '@code-share/shared/types/product'

import CatalogSearch from '@/components/features/catalog/CatalogSearch.vue'
import CatalogSidebar from '@/components/features/catalog/CatalogSidebar.vue'
import ProductCard from '@/components/features/catalog/ProductCard.vue'

import { useCartSidebarStore, useCartStore } from '@/stores/cart.store'
import { useCatalogStore } from '@/stores/catalog.store'
import { useProductStore } from '@/stores/product.store'

import LoadingIcon from '@/assets/icons/loading.svg'

const sidebar = useCartSidebarStore()
const cart = useCartStore()
const products = useProductStore()
const catalog = useCatalogStore()

function addToCart(product: Product) {
  cart.add({
    id: product.id,
    title: product.title,
    image: product.images[0].src,
    price: product.price,
    discount: product.discount,
    quantity: 1
  })

  sidebar.open = true
}
</script>

<template>
  <section class="catalog">
    <CatalogSidebar class="sidebar" />

    <div class="content">
      <CatalogSearch
        placeholder="Search through our courses..."
        label="catalog search"
      />

      <LoadingIcon class="loading" v-if="products.loading" />

      <p class="message" v-if="catalog.products.length === 0">
        Nothing here yet. Maybe try a different keyword or adjust your filters
        to explore other options.
      </p>

      <p class="error" v-if="products.error">
        Ops! Something went wrong while loading our products, please try again
        later.
      </p>

      <TransitionGroup
        class="products"
        name="products"
        aria-live="polite"
        tag="div"
      >
        <ProductCard
          v-for="product in catalog.products"
          :key="product.id"
          :id="product.id"
          :title="product.title"
          :image="product.images[0].src"
          :price="product.price"
          :discount="product.discount"
          :available="product.available"
          @add-to-cart="addToCart(product)"
        />
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  --sidebar-size: 300px;
  --content-size: 1fr;

  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (640px <= width) {
  .catalog {
    display: grid;
    grid-template-columns: min(var(--sidebar-size), 100%) var(--content-size);
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.products {
  --columns: 1;
  --product-size: 1fr;

  display: grid;
  grid-template-columns: repeat(var(--columns), var(--product-size));
  gap: var(--spacing-md);
}

@media (580px <= width <= 640px) {
  .products {
    --columns: 2;
  }
}

@media (920px <= width) {
  .products {
    --columns: 2;
  }
}

@media (1200px <= width) {
  .products {
    --columns: 3;
  }
}

.products-enter-active,
.products-leave-active {
  transition-duration: 250ms;
  transition-property: opacity, transform;
  transition-timing-function: ease-in-out;
}

.products-leave-active {
  transition-duration: 500ms;
}

.products-enter-from,
.products-leave-to {
  transform: translateY(-1rem);
  opacity: 0;
}

:where(.loading, .error, .message) {
  align-self: center;
}

.error {
  color: var(--color-danger);
  font-weight: var(--font-weight-bold);
}
</style>
