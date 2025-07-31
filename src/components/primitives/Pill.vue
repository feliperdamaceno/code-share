<template>
  <span class="pill">
    <slot></slot>
  </span>
</template>

<style scoped>
.pill {
  background-color: var(--dark-6);
  color: var(--color-text-on-dark);
  font-size: var(--text-small);
  font-weight: var(--font-weight-medium);
  display: inline-block;
  border-radius: var(--border-xs);
  padding-inline: var(--spacing-sm);
  padding-block: 2px;
}
</style>
