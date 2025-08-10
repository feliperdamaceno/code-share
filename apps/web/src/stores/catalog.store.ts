import { reactive, watch } from 'vue'

import type { LocationQueryRaw } from 'vue-router'

import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

type Query<Filters> = {
  [Key in keyof Filters]?: Filters[Key]
}

const toBool = (value: unknown) => value === 'true' || value === true

export const useCatalogStore = defineStore('catalog', () => {
  const route = useRoute()
  const router = useRouter()

  /* state */
  const filters = reactive({
    search: String(route.query['search'] || ''),
    category: String(route.query['category'] || ''),
    newest: toBool(route.query['newest']),
    featured: toBool(route.query['featured'])
  })

  /* actions */
  type Filters = typeof filters
  function addQuery(query: Query<Filters>) {
    router.push({
      query: { ...route.query, ...(query as LocationQueryRaw) }
    })
  }

  type FilterKeys = keyof typeof filters
  function removeQuery(key: FilterKeys) {
    const { [key]: _, ...queries } = route.query
    router.push({ query: { ...queries } })
  }

  /* watchers */
  watch(
    () => filters.newest,
    (value) => {
      if (value) return addQuery({ ['newest']: value })
      removeQuery('newest')
    }
  )

  watch(
    () => filters.featured,
    (value) => {
      if (value) return addQuery({ ['featured']: value })
      removeQuery('featured')
    }
  )

  /* filters should only be kept withing the catalog route */
  watch(
    () => route.path,
    () => {
      /* clear all queries */
      router.replace({ query: {} })

      /* reset all filters */
      filters.search = ''
      filters.category = ''
      filters.newest = false
      filters.featured = false
    }
  )

  return { filters, addQuery, removeQuery }
})
