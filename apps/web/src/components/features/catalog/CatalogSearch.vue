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

const submit = () => {
  filters.addFilter({ search: filters.options.search })
}

const clear = () => {
  filters.options.search = ''
  filters.removeFilter(['search'])
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') submit()
}
</script>

<template>
  <div role="search" class="search--base">
    <button
      type="submit"
      class="search-button"
      aria-label="submit search"
      @click="submit"
    >
      <SearchIcon class="search-icon" aria-hidden="true" />
    </button>

    <input
      type="search"
      class="search"
      id="search"
      name="search"
      :placeholder="placeholder"
      :aria-label="label"
      v-model="filters.options.search"
      @keydown="onKeyDown"
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

:is(.search-button, .clear-button) {
  display: grid;
  place-items: center;
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  border: none;
  border-radius: var(--border-xs);
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
