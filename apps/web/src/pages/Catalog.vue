<script setup lang="ts">
import { onBeforeMount } from 'vue'

import CatalogSearch from '@/components/features/catalog/CatalogSearch.vue'
import CatalogSidebar from '@/components/features/catalog/CatalogSidebar.vue'
import ProductCard from '@/components/features/catalog/ProductCard.vue'

import LoadingIcon from '@/assets/icons/loading.svg'
import { useProductStore } from '@/stores/product.store'

const products = useProductStore()

onBeforeMount(products.load)
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
  --sidebar-size: 300px;

  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (min-width: 660px) {
  .catalog {
    display: grid;
    grid-template-columns: min(var(--sidebar-size, 100%)) 1fr;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.products {
  --card-size: 260px;

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(var(--card-size), 100%), 1fr)
  );
  gap: var(--spacing-md);
}

.loading {
  align-self: center;
}
</style>
