import { ref, watch } from 'vue'

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
    router.push({
      path: route.path,
      query: {
        ['search']: filters.value.search,
        ...route.query
      }
    })
  }

  function clearSearch() {
    filters.value.search = ''
    const { ['search']: removed, ...queries } = route.query
    router.push({ path: '/catalog', query: { ...queries }, replace: true })
  }

  /* when query is empty,"search" query should be removed from URL */
  watch(filters.value, () => filters.value.search.length <= 0 && clearSearch())

  return { filters, submit, clearSearch }
})
