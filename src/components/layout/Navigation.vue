<script setup lang="ts">
import ShoppingBag from '@/assets/icons/shopping-bag.svg'
import { routes } from '@/routes'
</script>

<template>
  <header class="navigation--base">
    <nav class="navigation">
      <RouterLink to="/">
        <h1 class="brand">Code Share</h1>
      </RouterLink>

      <ul class="link-list" role="list">
        <li v-for="route in routes" :key="route.name">
          <RouterLink class="link" exactActiveClass="active" :to="route.path">
            {{ route.name }}
          </RouterLink>
        </li>
      </ul>

      <Transition>
        <button class="shopping-button" aria-label="open shopping cart">
          <ShoppingBag class="shopping-cart-icon" aria-hidden="true" />
        </button>
      </Transition>
    </nav>
  </header>
</template>

<style scoped>
.navigation--base {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-rounded);
  border-color: var(--light-3);
  background-color: var(--light-2);
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

a:has(.brand) {
  text-decoration: none;
}

.brand {
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-2xl);
}

.link-list {
  display: flex;
  align-items: end;
  gap: var(--spacing-lg);
}

.link {
  color: var(--color-text);
}

.link:hover {
  text-decoration-color: currentColor;
}

.link.active {
  font-weight: var(--font-weight-bold);
  text-decoration-color: currentColor;
}

.shopping-button {
  display: grid;
  place-items: center;
  margin-inline-end: calc(var(--spacing-sm) * -1);
  padding-inline: var(--spacing-sm);
  padding-block: var(--spacing-sm);
  border: none;
  border-radius: var(--border-rounded);
  background-color: transparent;
  cursor: pointer;
}

.shopping-cart-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.shopping-cart-icon * {
  color: var(--color-text);
}
</style>
