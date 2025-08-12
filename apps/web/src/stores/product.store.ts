import { ref, shallowRef } from 'vue'

import type { Product } from '@code-share/shared/types/product'

import { defineStore } from 'pinia'

import { ProductRequest } from '@/requests/product.request'

export const useProductStore = defineStore('product', () => {
  /* state */
  const data = ref<Map<'products', Product[]>>(new Map())
  const loading = shallowRef<boolean>(false)
  const error = shallowRef<Error | null>(null)

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
  const timestamp = shallowRef(Date.now())

  /* private: actions */
  function revalidate() {
    const elapsed = Date.now() - timestamp.value
    return elapsed > 60_000 /* 60 sec */
  }

  async function fetch() {
    loading.value = true
    const [products, err] = await ProductRequest.getAllProducts()
    loading.value = false

    if (err !== null) {
      return (error.value = err)
    }

    data.value.set('products', products)
  }

  return { data, loading, error, load }
})
