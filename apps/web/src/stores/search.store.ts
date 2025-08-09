import { ref, watch } from 'vue'

import type { LocationQueryRaw } from 'vue-router'

import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useSearchStore = defineStore('catalog', () => {
  const route = useRoute()
  const router = useRouter()

  /* state */
  const filters = ref({
    search: '',
    category: '',
    newest: false,
    featured: false
  })

  /* actions */
  const submit = () => {
    const queries = getQueries()
    router.replace({ query: queries as LocationQueryRaw })
  }

  watch(
    () => filters.value.newest,
    () => {
      if (filters.value.newest === false) return
      const { ['newest']: _, ...queries } = route.query
      router.replace({ query: { ...queries } })
    }
  )

  watch(
    () => filters.value.featured,
    () => {
      if (filters.value.featured === false) return
      const { ['featured']: _, ...queries } = route.query
      router.replace({ query: { ...queries } })
    }
  )

  function clearSearch() {
    filters.value.search = ''
    const { ['search']: _, ...queries } = route.query
    router.replace({ query: { ...queries } })
  }

  /* private: actions */
  function getQueries() {
    const queries = Object.entries(filters.value)
    return queries.reduce(
      (result, [key, value]) => {
        if (!value) return result
        result[key] = value
        return result
      },
      {} as Record<string, unknown>
    )
  }

  return { filters, submit, clearSearch }
})
