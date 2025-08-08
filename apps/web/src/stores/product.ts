import { computed, ref } from 'vue'

import type { Product } from '@code-share/shared/types/product'

import { defineStore } from 'pinia'

import { ProductRequest } from '@/data/products'

type ProductPayloads = 'all'

export const useProductStore = defineStore('product', () => {
  /* state */
  const products = ref<Map<ProductPayloads, Product[]>>(new Map([]))
  const loading = ref<boolean>(false)
  const error = ref<Error | null>(null)

  /* state: private */
  const timestamp = ref<number>(Date.now())

  /* getters */
  const getProducts = computed(() => {
    return (payload: ProductPayloads): Product[] => {
      if (revalidate.value) setProducts(payload)

      if (products.value.has(payload)) {
        return products.value.get(payload) as Product[]
      }

      setProducts(payload)
      return products.value.get(payload) as Product[]
    }
  })

  /* getters: private */
  const revalidate = computed(() => {
    const elapsed = Date.now() - timestamp.value
    return elapsed > 60000 /* 60 seconds */
  })

  /* actions: private */
  const setProducts = async (payload: ProductPayloads) => {
    loading.value = true
    const [data, err] = await ProductRequest.getAllProducts()
    loading.value = false

    if (err !== null) {
      console.error(err)
      return (error.value = err)
    }

    products.value.set(payload, data)
    timestamp.value = Date.now()
  }

  return {
    loading,
    error,
    getProducts
  }
})
