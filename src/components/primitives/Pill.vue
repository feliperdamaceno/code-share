<template>
  <span class="pill">
    <slot></slot>
  </span>
</template>

<style scoped>
.pill {
  color: var(--color-text-on-dark);
  background-color: var(--dark-6);
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  padding-inline: var(--spacing-sm);
  padding-block: 2px;
  border-radius: var(--border-xs);
  display: inline-block;
}
</style>
