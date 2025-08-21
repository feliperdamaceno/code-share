<script setup lang="ts">
import ProductCard from '@/components/features/catalog/ProductCard.vue'

import { useCartStore } from '@/stores/cart.store'
import { useCatalogStore } from '@/stores/catalog.store'

const cart = useCartStore()
const catalog = useCatalogStore()
</script>

<template>
  <section id="featured-products-section" class="featured-products">
    <h2 id="featured-products-section" class="headline">Recommended</h2>

    <div class="products">
      <ProductCard
        v-for="product in catalog.featured.slice(0, 3)"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :slug="product.slug"
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
  gap: var(--spacing-lg);
}

.headline {
  font-weight: var(--font-weight-bold);
  font-family: var(--font-body);
}

.products {
  --columns: 1;
  --product-size: 1fr;

  display: grid;
  grid-template-columns: repeat(var(--columns), var(--product-size));
  gap: var(--spacing-md);
}

@media (550px <= width) {
  .products {
    --columns: 2;
  }
}

@media (850px <= width) {
  .products {
    --columns: 3;
  }
}

@media (1000px <= width) {
  .products {
    --columns: 4;
  }
}
</style>
