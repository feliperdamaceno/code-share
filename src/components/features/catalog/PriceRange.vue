<script setup lang="ts"></script>

<template>
  <div class="price-range">
    <fieldset class="fieldset">
      <legend class="legend">From</legend>
      <input class="input" name="from" type="number" placeholder="100" />
    </fieldset>

    <fieldset class="fieldset">
      <legend class="legend">To</legend>
      <input class="input" name="to" type="number" placeholder="1000" />
    </fieldset>
  </div>
</template>

<style scoped>
.price-range {
  display: flex;
  gap: var(--spacing-sm);
}

.legend {
  padding-inline: var(--spacing-sm);
  background-color: var(--light-2);
  color: var(--gray-5);
}

.fieldset {
  display: flex;
  flex: 1;
  inline-size: 0;
  min-inline-size: 0;
  margin-inline: 0;
  padding-inline: var(--spacing-sm);
  padding-block: var(--spacing-xs);
  border-width: 1px;
  border-style: solid;
  border-radius: var(--border-xs);
  border-color: var(--light-3);
  background-color: var(--light-2);
}

.fieldset::before {
  padding-inline-start: var(--spacing-sm);
  content: '€';
  color: var(--light-4);
  font-weight: var(--font-weight-medium);
  transition-duration: 125ms;
  transition-property: color;
  transition-timing-function: ease;
}

.fieldset:has(.input:focus-visible) {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 1px var(--color-focus);
}

.fieldset:has(.input:focus-visible)::before,
.fieldset:has(.input:not(:placeholder-shown))::before {
  color: currentColor;
}

.input {
  display: flex;
  justify-items: start;
  inline-size: 100%;
  padding-inline-start: 0.25ch;
  padding-inline-end: var(--spacing-sm);
  padding-block: unset;
  border: none;
  background-color: var(--light-2);
  font-weight: var(--font-weight-medium);
}

.input::placeholder {
  color: var(--light-4);
}

.input:focus-visible {
  outline: none;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input {
  -moz-appearance: textfield;
}
</style>
