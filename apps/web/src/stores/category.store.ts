import { ref, shallowRef } from 'vue'

import type { Category } from '@code-share/shared/types/ecomm'

import { defineStore } from 'pinia'

import { CategoryRequest } from '@/requests/category.request'

export const useCategoryStore = defineStore('category', () => {
  /* state */
  const data = ref<Map<'categories', Category[]>>(new Map())
  const loading = shallowRef<boolean>(false)
  const error = shallowRef<Error | null>(null)

  /* actions */
  async function load() {
    if (data.value.has('categories')) {
      if (revalidate()) {
        await fetch()
        timestamp.value = Date.now()
      }

      return data.value.get('categories') as Category[]
    }

    await fetch()
    timestamp.value = Date.now()
    return data.value.get('categories') as Category[]
  }

  /* private: state */
  const timestamp = shallowRef(Date.now())

  /* private: actions */
  function revalidate() {
    const elapsed = Date.now() - timestamp.value
    return elapsed > 900_000 /* 15 min */
  }

  async function fetch() {
    loading.value = true
    const [categories, err] = await CategoryRequest.getAllCategories()
    loading.value = false

    if (err !== null) {
      return (error.value = err)
    }

    data.value.set('categories', categories)
  }

  return { data, loading, error, load }
})
