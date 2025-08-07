<script setup lang="ts">
import type { Coupon } from '@code-share/shared/types/ecomm'

import Button from '@/components/primitives/Button.vue'
import TextField from '@/components/primitives/TextField.vue'

const coupons = defineModel<Coupon[]>({ default: [] })
</script>

<template>
  <div class="coupon-box" aria-label="coupons">
    <ul v-if="coupons.length > 0" class="coupon-list" role="list">
      <li class="coupon-item" v-for="coupon in coupons" :key="coupon.code">
        <span class="code">{{ coupon.code }}</span>
        <button class="remove-button">Remove</button>
      </li>
    </ul>

    <form class="coupon-form">
      <TextField placeholder="Enter a coupon here" />
      <Button type="submit">Apply</Button>
    </form>
  </div>
</template>

<style scoped>
.coupon-box {
  display: grid;
  gap: var(--spacing-md);
}

.coupon-list {
  display: grid;
  gap: var(--spacing-sm);
}

.coupon-item {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.coupon-item .code {
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
}

.coupon-item .remove-button {
  border: 0;
  background-color: transparent;
  color: var(--color-danger);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}

.coupon-form {
  display: flex;
  gap: var(--spacing-sm);
}
</style>
