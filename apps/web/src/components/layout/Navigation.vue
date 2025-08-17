<script setup lang="ts">
import { useCartSidebarStore, useCartStore } from '@/stores/cart.store'

import ShoppingBag from '@/assets/icons/shopping-bag.svg'
import { routes } from '@/routes'

const sidebar = useCartSidebarStore()
const cart = useCartStore()

const links = routes
  .map((route) => ({ name: route.name, path: route.path }))
  .filter((route) => route.name)
</script>

<template>
  <header class="navigation">
    <nav class="container">
      <RouterLink to="/">
        <h1 class="brand">Code Share</h1>
      </RouterLink>

      <ul v-if="links.length" class="link-list" role="list">
        <li v-for="link in links" :key="link.name">
          <RouterLink class="link" exactActiveClass="active" :to="link.path">
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>

      <Transition>
        <button
          class="shopping-button"
          aria-label="open shopping cart"
          @click="sidebar.toggle"
        >
          <span class="cart-size" aria-hidden="true">{{ cart.size }}</span>

          <span
            class="visually-hidden"
            :aria-label="`cart has ${cart.size} items`"
          >
          </span>

          <ShoppingBag class="shopping-cart-icon" aria-hidden="true" />
        </button>
      </Transition>
    </nav>
  </header>
</template>

<style scoped>
.navigation {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-rounded);
  border-color: var(--light-3);
  background-color: var(--light-2);
}

.container {
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
  position: relative;
  place-items: center;
  margin-inline-end: calc(var(--spacing-sm) * -1);
  padding-inline: var(--spacing-sm);
  padding-block: var(--spacing-sm);
  border: none;
  border-radius: var(--border-rounded);
  background-color: transparent;
  cursor: pointer;
}

.shopping-button .cart-size {
  display: grid;
  position: absolute;
  top: 0;
  right: 0;
  place-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: var(--border-rounded);
  background-color: var(--color-accent);
  color: var(--light-2);
  font-weight: var(--font-weight-medium);
  font-size: 12px;
}

.shopping-cart-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.shopping-cart-icon * {
  color: var(--color-text);
}
</style>
