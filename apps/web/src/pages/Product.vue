<script setup lang="ts">
import { onBeforeMount } from 'vue'

import type { Product } from '@code-share/shared/types/product'

import { useRoute } from 'vue-router'

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
</script>

<template>
  <section>
    <LoadingIcon class="loading" v-if="loading" />

    <p class="error" v-else-if="error">
      Ops! Something went wrong while loading this product, please try again
      later.
    </p>

    <div class="product" v-else>
      <h2>{{ product.title }}</h2>
    </div>
  </section>
</template>

<style scoped>
:is(.loading, .error) {
  margin-inline: auto;
}

.error {
  color: var(--color-danger);
  font-weight: var(--font-weight-bold);
}
</style>
