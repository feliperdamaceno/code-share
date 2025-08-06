<template>
  <span class="pill">
    <slot></slot>
  </span>
</template>

<style scoped>
.pill {
  display: inline-block;
  padding-inline: var(--spacing-sm);
  padding-block: 2px;
  border-radius: var(--border-xs);
  background-color: var(--dark-6);
  color: var(--color-text-on-dark);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-small);
}
</style>
