import { ref } from 'vue'

import type { Product } from '@code-share/shared/types/product'

import { defineStore } from 'pinia'

import { ProductRequest } from '@/data/products'

export const useProductStore = defineStore('product', () => {
  /* state */
  const data = ref<Map<'products', Product[]>>(new Map())
  const loading = ref<boolean>(false)
  const error = ref<Error | null>(null)

  /* actions */
  async function load() {
    if (data.value.has('products')) {
      if (revalidate()) {
        await fetch()
        timestamp.value = Date.now()
      }

      return data.value.get('products') as Product[]
    }

    await fetch()
    timestamp.value = Date.now()
    return data.value.get('products') as Product[]
  }

  /* private: state */
  const timestamp = ref(Date.now())

  /* private: actions */
  function revalidate() {
    const elapsed = Date.now() - timestamp.value
    return elapsed > 60000 /* 10s */
  }

  async function fetch() {
    loading.value = true
    const [products, err] = await ProductRequest.getAllProducts()
    loading.value = false

    if (err !== null) {
      error.value = err
      console.error(error.value)
      return
    }

    data.value.set('products', products)
  }

  return { data, loading, error, load }
})
