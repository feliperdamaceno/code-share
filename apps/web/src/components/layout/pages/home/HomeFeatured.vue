<script setup lang="ts">
import ProductCard from '@/components/features/catalog/ProductCard.vue'

import { useCartStore } from '@/stores/cart.store'
import { useCatalogStore } from '@/stores/catalog.store'

const cart = useCartStore()
const catalog = useCatalogStore()
</script>

<template>
  <section id="featured-products-section" class="featured-products">
    <hgroup class="headline">
      <p class="eyebrow">Featured</p>

      <h2 id="featured-products-section" class="title">
        Explore our most popular courses!
      </h2>
    </hgroup>

    <div class="products">
      <ProductCard
        v-for="product in catalog.featured.slice(0, 3)"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :image="product.images[0].src"
        :price="product.price"
        :discount="product.discount"
        :available="product.available"
        @add-to-cart="cart.add(product)"
      />
    </div>
  </section>
</template>

<style scoped>
.featured-products {
  display: grid;
  justify-items: center;
  inline-size: 100%;
  gap: var(--spacing-lg);
}

.headline {
  display: grid;
  gap: var(--spacing-sm);
  text-align: center;
}

.headline .eyebrow {
  font-size: var(--text-lg);
  text-transform: uppercase;
}

.headline .title {
  font-weight: var(--font-weight-bold);
  font-family: var(--font-body);
}

.products {
  --columns: 1;
  --product-size: 1fr;

  display: grid;
  grid-template-columns: repeat(var(--columns), var(--product-size));
  max-inline-size: 1200px;
  gap: var(--spacing-xl);
}

@media (850px <= width) {
  .products {
    --columns: 2;
  }
}

@media (1000px <= width) {
  .products {
    --columns: 3;
  }
}
</style>
