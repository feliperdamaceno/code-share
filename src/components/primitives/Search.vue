<script setup lang="ts">
import { useRouter } from 'vue-router'

import CloseIcon from '@/assets/icons/close.svg'
import SearchIcon from '@/assets/icons/search.svg'

type Props = {
  name?: string
  placeholder?: string
  path?: string
  label?: string
}

const {
  name = 'search',
  placeholder = undefined,
  path = '/',
  label = undefined
} = defineProps<Props>()

defineOptions({ inheritAttrs: false })

const router = useRouter()
const query = defineModel<string>({ default: '' })

const search = () => {
  router.push({ path, query: { [name]: query.value } })
}

const clear = () => {
  query.value = ''
  router.push({ path, replace: true })
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') search()
}
</script>

<template>
  <div role="search" class="search--base">
    <button
      type="submit"
      class="search-button"
      aria-label="submit search"
      @click="search"
    >
      <SearchIcon class="search-icon" aria-hidden="true" />
    </button>

    <input
      type="search"
      class="search"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :aria-label="label"
      v-model="query"
      @keydown="onKeyDown"
      v-bind="$attrs"
    />

    <Transition name="clear">
      <button
        v-if="query.length > 0"
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
  background-color: var(--light-2);
  border-color: var(--light-3);
  border-radius: var(--border-xs);
  border-width: 1px;
  border-style: solid;
  display: flex;
  align-items: center;
  max-inline-size: 100%;
}

:is(.search-button, .clear-button) {
  background-color: transparent;
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  border-radius: var(--border-xs);
  border: none;
  display: grid;
  place-items: center;
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
  transition-property: opacity;
  transition-timing-function: ease;
  transition-duration: 125ms;
}

.clear-enter-from,
.clear-leave-to {
  opacity: 0;
}

.search {
  background-color: transparent;
  flex: 1;
  padding: 0;
  border: none;
  padding-block: var(--spacing-sm);
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
