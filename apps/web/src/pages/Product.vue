<script setup lang="ts">
import { onBeforeMount } from 'vue'

import type { Product } from '@code-share/shared/types/product'

import { useRoute } from 'vue-router'

import { useAsyncQuery } from '@/composables/useAsyncQuery'
import { ProductRequest } from '@/requests/product.request'

const route = useRoute()
const slug = route.params.slug

const {
  data: product,
  loading,
  error,
  load
} = useAsyncQuery<Product | null>('product', async () => {
  return await ProductRequest.getProductBySlug(
    Array.isArray(slug) ? slug[0] : slug
  )
})

onBeforeMount(async () => await load())
</script>

<template>
  <section>
    <h2>{{ product?.title }}</h2>
  </section>
</template>

<style scoped></style>
