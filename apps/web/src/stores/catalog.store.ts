import { computed } from 'vue'

import type { Product } from '@code-share/shared/types/product'

import { defineStore } from 'pinia'

import { useFilterStore } from '@/stores/filter.store'
import { useProductStore } from '@/stores/product.store'

export const useCatalogStore = defineStore('catalog', () => {
  const filters = useFilterStore()
  const products = useProductStore()

  /* getters */
  const data = computed((): Product[] => {
    const initial = products.data.get('products')

    if (!initial) return []

    const filterFns = [byPrice, bySearch, byCategory, byNewest, byFeatured]

    return initial.filter((product) => {
      return filterFns.every((filter) => filter(product))
    })
  })

  /* private: actions */
  const byPrice = (product: Product) => {
    let min = filters.options['price-from']
    let max = filters.options['price-to']

    if (min === 0 && max === 0) return true

    if (product.price < min) return false
    if (product.price > max) return false

    return true
  }

  const bySearch = (product: Product) => {
    const search = filters.options.search

    if (search.length <= 0) return true

    return product.title.toLowerCase().includes(search.toLowerCase().trim())
  }

  const byCategory = (product: Product) => {
    const category = filters.options.category

    if (category.length <= 0) return true

    return product.categories.some((option) => option.name === category)
  }

  const byNewest = (product: Product) => {
    if (filters.options.newest === false) return true

    const createdAt = new Date(product.createdAt)

    const now = new Date()
    const lastMonth = new Date(now)
    lastMonth.setDate(now.getDate() - 30)

    return createdAt >= lastMonth && createdAt <= now
  }

  const byFeatured = (product: Product) => {
    if (filters.options.featured === false) return true
    return product.featured
  }

  return { products: data }
})
