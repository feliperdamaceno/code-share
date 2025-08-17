import type { Product } from '@code-share/shared/types/product'

import { defineStore } from 'pinia'

import { useAsyncQuery } from '@/composables/useAsyncQuery'
import { ProductRequest } from '@/requests/product.request'

export const useProductStore = defineStore('product', () => {
  const { data, loading, error, load } = useAsyncQuery<Product[]>(
    'products',
    ProductRequest.getAllProducts,
    {
      revalidate: 60_000 /* 60 sec */
    }
  )

  return { data, loading, error, load }
})
