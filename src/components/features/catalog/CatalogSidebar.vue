<script setup lang="ts">
import PriceRange from '@/components/features/catalog/PriceRange.vue'
import Accordion from '@/components/primitives/Accordion.vue'
import Checkbox from '@/components/primitives/Checkbox.vue'
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

      <Accordion title="Option" :open="true">
        <p>Value</p>
        <p>Value</p>
        <p>Value</p>
      </Accordion>

      <Accordion title="Option">
        <p>Value</p>
        <p>Value</p>
        <p>Value</p>
      </Accordion>
    </div>

    <hr class="divisor" />

    <div class="filter-section">
      <div class="heading-group">
        <h2 class="heading">Filter By:</h2>
      </div>

      <Checkbox>Newest</Checkbox>
      <Checkbox>Featured</Checkbox>
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

.filter-section {
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

.divisor {
  margin: 0;
  border: none;
  border-block-end-color: var(--light-3);
  border-block-end-style: solid;
  border-block-end-width: 1px;
}
</style>
