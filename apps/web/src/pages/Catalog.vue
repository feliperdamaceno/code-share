<script setup lang="ts">
import { onBeforeMount } from 'vue'

import CatalogSidebar from '@/components/features/catalog/CatalogSidebar.vue'
import ProductCard from '@/components/features/catalog/ProductCard.vue'
import Search from '@/components/primitives/Search.vue'

import { useProductStore } from '@/stores/product'

const products = useProductStore()

onBeforeMount(products.load)
</script>

<template>
  <section class="catalog">
    <CatalogSidebar class="sidebar" />

    <div class="content">
      <Search name="search" />

      <p v-if="products.loading">Loading catalog...</p>
      <p v-if="products.error">{{ products.error.message }}</p>

      <div class="products">
        <ProductCard
          v-for="product in products.data.get('products')"
          :key="product.id"
          :src="product.images[0].src"
          :title="product.title"
          :price="product.price"
          :available="product.available"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (min-width: 660px) {
  .catalog {
    display: grid;
    grid-template-columns: 300px 1fr;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(275px, 100%), 1fr));
  gap: var(--spacing-md);
}
</style>
