<script setup lang="ts"></script>

<template>
  <a class="skip" href="#main-content">Skip to Main Content</a>
</template>

<style scoped>
.skip {
  z-index: 999;
  position: absolute;
  top: var(--spacing-md);
  left: -100%;
  padding-inline: var(--spacing-sm);
  opacity: 0;
  transition-duration: 150ms;
  transition-property: left, opacity;
  transition-timing-function: ease-in-out;
}

.skip:focus-visible {
  left: var(--spacing-md);
  opacity: 1;
}
</style>
