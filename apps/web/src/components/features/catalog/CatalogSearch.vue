<script setup lang="ts">
import CloseIcon from '@/assets/icons/close.svg'
import SearchIcon from '@/assets/icons/search.svg'
import { useFilterStore } from '@/stores/filter.store'

type Props = {
  placeholder?: string
  label?: string
}

const { placeholder = undefined, label = undefined } = defineProps<Props>()

defineOptions({ inheritAttrs: false })

const filters = useFilterStore()

const clear = () => {
  filters.options.search = ''
  filters.removeFilter(['search'])
}
</script>

<template>
  <div role="search" class="search--base">
    <div class="search-icon-wrapper">
      <SearchIcon class="search-icon" aria-hidden="true" />
    </div>

    <input
      type="search"
      class="search"
      id="search"
      name="search"
      :placeholder="placeholder"
      :aria-label="label"
      v-model="filters.options.search"
      v-bind="$attrs"
    />

    <Transition name="clear">
      <button
        v-if="filters.options.search.length > 0"
        class="clear-button"
        aria-label="clear search input"
        @click="clear"
      >
        <CloseIcon class="clear-icon" aria-hidden="true" />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.search--base {
  display: flex;
  align-items: center;
  inline-size: 100%;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-xs);
  border-color: var(--light-3);
  background-color: var(--light-2);
}

.search--base:has(.search:focus-visible) {
  outline-color: var(--color-focus);
  outline-style: solid;
  outline-width: 2px;
}

:is(.search-icon-wrapper, .clear-button) {
  display: grid;
  place-items: center;
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  border-radius: var(--border-xs);
}

.clear-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

:is(.search-icon, .clear-icon) {
  width: 1.25rem;
  height: 1.25rem;
}

:is(.search-icon, .clear-icon) * {
  color: var(--gray-5);
}

.clear-enter-active,
.clear-leave-active {
  transition-duration: 125ms;
  transition-property: opacity;
  transition-timing-function: ease;
}

.clear-enter-from,
.clear-leave-to {
  opacity: 0;
}

.search {
  flex: 1;
  padding: 0;
  padding-block: var(--spacing-sm);
  border: none;
  background-color: transparent;
}

.search:focus-visible {
  outline: none;
}

.search::-webkit-search-decoration,
.search::-webkit-search-cancel-button,
.search::-webkit-search-results-button,
.search::-webkit-search-results-decoration {
  display: none;
}
</style>
