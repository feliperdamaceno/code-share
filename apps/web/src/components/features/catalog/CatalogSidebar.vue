<script setup lang="ts">
import { onBeforeMount } from 'vue'

import PriceRange from '@/components/features/catalog/PriceRange.vue'
import Accordion from '@/components/primitives/Accordion.vue'
import Checkbox from '@/components/primitives/Checkbox.vue'

import LoadingIcon from '@/assets/icons/loading.svg'
import { useCatalogStore } from '@/stores/catalog.store'
import { useCategoryStore } from '@/stores/category.store'

const categories = useCategoryStore()
const catalog = useCatalogStore()

function selectCategory(category: string) {
  catalog.filters.category = category
  catalog.addQuery({ category: category })
}

function resetCategory() {
  catalog.filters.category = ''
  catalog.removeQuery('category')
}

onBeforeMount(() => categories.load())
</script>

<template>
  <section
    class="catalog-sidebar"
    role="navigation"
    aria-label="catalog filters"
  >
    <div class="filter-section">
      <div class="heading-group">
        <h2 class="heading">Price</h2>
        <button class="reset-button">Reset</button>
      </div>

      <PriceRange />
    </div>

    <hr class="divisor" />

    <div class="filter-section">
      <div class="heading-group">
        <h2 class="heading">Category</h2>
        <button class="reset-button" @click="resetCategory">Reset</button>
      </div>

      <LoadingIcon class="loading" v-if="categories.loading" />
      <p class="error" v-else-if="categories.error">
        {{ categories.error.message }}
      </p>

      <div v-else class="categories">
        <Accordion
          v-for="category in categories.data.get('categories')"
          :key="category.id"
          :title="category.name"
          :open="true"
        >
          <button
            v-for="option in category.options"
            class="option"
            :key="option.id"
            :class="{ active: catalog.filters.category === option.name }"
            :aria-pressed="catalog.filters.category === option.name"
            @click="selectCategory(option.name)"
          >
            {{ option.name }}
          </button>
        </Accordion>
      </div>
    </div>

    <hr class="divisor" />

    <div class="filter-section">
      <div class="heading-group">
        <h2 class="heading">Filter By:</h2>
      </div>

      <Checkbox name="newest" v-model="catalog.filters.newest">
        Newest
      </Checkbox>

      <Checkbox name="featured" v-model="catalog.filters.featured">
        Featured
      </Checkbox>
    </div>
  </section>
</template>

<style scoped>
.catalog-sidebar {
  display: flex;
  flex-direction: column;
  padding-inline: var(--spacing-lg);
  padding-block: var(--spacing-lg);
  gap: var(--spacing-lg);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-sm);
  border-color: var(--light-3);
  background-color: var(--light-2);
}

:is(.filter-section, .categories) {
  display: grid;
  gap: var(--spacing-md);
}

.heading-group {
  display: flex;
  justify-content: space-between;
}

.heading-group .heading {
  font-size: var(--text-lg);
}

.heading-group .reset-button {
  border: 0;
  background-color: transparent;
  color: var(--color-accent);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-small);
  cursor: pointer;
  transition-duration: 150ms;
  transition-property: color;
  transition-timing-function: ease;
}

.heading-group .reset-button:hover {
  color: var(--color-accent-on-hover);
}

.categories .option {
  inline-size: fit-content;
  padding-inline: 0;
  padding-block: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}

.categories .option.active {
  color: var(--color-accent);
  font-weight: var(--font-weight-bold);
}

.categories .option:not(:last-of-type) {
  margin-bottom: var(--spacing-xs);
}

.loading {
  margin-inline: auto;
}

.error {
  color: var(--color-danger);
}

.divisor {
  margin: 0;
  border: none;
  border-block-end-color: var(--light-3);
  border-block-end-style: solid;
  border-block-end-width: 1px;
}
</style>
