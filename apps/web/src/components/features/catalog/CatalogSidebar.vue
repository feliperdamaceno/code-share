<script setup lang="ts">
import { onBeforeMount } from 'vue'

import PriceRange from '@/components/features/catalog/PriceRange.vue'
import Accordion from '@/components/primitives/Accordion.vue'
import Checkbox from '@/components/primitives/Checkbox.vue'

import { useCategoryStore } from '@/stores/category.store'

const categories = useCategoryStore()

onBeforeMount(categories.load)
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
        <button class="reset-button">Clear</button>
      </div>

      <p v-if="categories.loading">loading...</p>
      <p class="error" v-else-if="categories.error">
        {{ categories.error.message }}
      </p>

      <div v-else class="categories">
        <Accordion
          v-for="(category, index) in categories.data.get('categories')"
          :key="category.id"
          :title="category.name"
          :open="index === 0"
        >
          <button
            class="option"
            v-for="option in category.options"
            :key="option.id"
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

      <Checkbox name="newest">Newest</Checkbox>
      <Checkbox name="featured">Featured</Checkbox>
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
}

.categories .option {
  inline-size: fit-content;
  padding-inline: 0;
  padding-block: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}

.categories .option:not(:last-of-type) {
  margin-bottom: var(--spacing-xs);
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
