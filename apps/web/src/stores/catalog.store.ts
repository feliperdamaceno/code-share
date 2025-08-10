import { reactive, watchEffect } from 'vue'

import type { LocationQueryRaw } from 'vue-router'

import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useCatalogStore = defineStore('catalog', () => {
  const route = useRoute()
  const router = useRouter()

  /* state */
  const filters = reactive({
    search: route.query['search'] || '',
    category: route.query['category'] || '',
    newest: Boolean(route.query['newest']) || false,
    featured: Boolean(route.query['featured']) || false
  })

  /* actions */
  function submitSearch() {
    addQuery({ ['search']: filters.search })
  }

  function clearSearch() {
    filters.search = ''
    removeQuery('search')
  }

  /* private: actions */
  function addQuery(query: LocationQueryRaw) {
    router.replace({ query: { ...route.query, ...query } })
  }

  function removeQuery(key: string) {
    const { [key]: _, ...queries } = route.query
    router.replace({ query: { ...queries } })
  }

  /* watchers */
  watchEffect(() => {
    if (filters.newest === false) return removeQuery('newest')
    addQuery({ ['newest']: String(filters.newest) })
  })

  watchEffect(() => {
    if (filters.featured === false) return removeQuery('featured')
    addQuery({ ['featured']: String(filters.featured) })
  })

  return { filters, submitSearch, clearSearch }
})
