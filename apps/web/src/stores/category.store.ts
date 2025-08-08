import { ref } from 'vue'

import type { Category } from '@code-share/shared/types/ecomm'

import { defineStore } from 'pinia'

import { CategoryRequest } from '@/requests/category.request'

export const useCategoryStore = defineStore('category', () => {
  /* state */
  const data = ref<Map<'categories', Category[]>>(new Map())
  const loading = ref<boolean>(false)
  const error = ref<Error | null>(null)

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
  const timestamp = ref(Date.now())

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
      error.value = err
      console.error(error.value)
      return
    }

    data.value.set('categories', categories)
  }

  return { data, loading, error, load }
})
