import { reactive, watch } from 'vue'

import type { LocationQueryRaw } from 'vue-router'

import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

type Query<Filters> = {
  [Key in keyof Filters]?: Filters[Key]
}

const toBool = (value: unknown) => value === 'true' || value === true

export const useFilterStore = defineStore('filter', () => {
  const route = useRoute()
  const router = useRouter()

  /* state */
  const options = reactive({
    ['price-from']: Number(route.query['price-from'] || 0),
    ['price-to']: Number(route.query['price-to'] || 0),
    search: String(route.query['search'] || ''),
    category: String(route.query['category'] || ''),
    newest: toBool(route.query['newest']),
    featured: toBool(route.query['featured'])
  })

  /* actions */
  type Filters = typeof options
  function addFilter(query: Query<Filters>) {
    router.push({
      query: { ...route.query, ...(query as LocationQueryRaw) }
    })
  }

  type FilterKeys = keyof typeof options
  function removeFilter(keys: FilterKeys[]) {
    const queries = { ...route.query }
    keys.forEach((key) => delete queries[key])
    router.push({ query: queries })
  }

  /* watchers */
  watch(
    () => route.path,
    () => {
      /* clear all queries */
      router.replace({ query: {} })

      /* reset all filters */
      options['price-from'] = 0
      options['price-to'] = 0
      options.search = ''
      options.category = ''
      options.newest = false
      options.featured = false
    }
  )

  return { options, addFilter, removeFilter }
})
