import type { Category } from '@code-share/shared/types/ecomm'

import { defineStore } from 'pinia'

import { useAsyncQuery } from '@/composables/useAsyncQuery'
import { CategoryRequest } from '@/requests/category.request'

export const useCategoryStore = defineStore('category', () => {
  const { data, loading, error, load } = useAsyncQuery<Category[]>(
    'categories',
    CategoryRequest.getAllCategories,
    {
      revalidate: 900_000 /* 15 min */
    }
  )

  return { data, loading, error, load }
})
