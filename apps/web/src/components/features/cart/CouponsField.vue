<script setup lang="ts">
import { ref } from 'vue'

import Button from '@/components/primitives/Button.vue'
import TextField from '@/components/primitives/TextField.vue'

import { useCouponStore } from '@/stores/coupon.store'

const coupons = useCouponStore()

const field = ref('')

async function onSubmit() {
  if (field.value === '') {
    coupons.error = null
    return
  }

  coupons.error = null
  await coupons.validate(field.value)
  field.value = ''
}
</script>

<template>
  <div class="coupons" aria-label="coupons">
    <ul v-if="coupons.validated.length > 0" class="coupon-list" role="list">
      <li
        v-for="coupon in coupons.validated"
        :key="coupon.id"
        class="coupon-item"
      >
        <span class="code">{{ coupon.code }}</span>
        <button class="remove-button" @click="coupons.remove(coupon.id)">
          Remove
        </button>
      </li>
    </ul>

    <div class="coupon-form-container">
      <small class="error" v-if="coupons.error">Invalid Code</small>

      <form class="coupon-form" @submit.prevent="onSubmit">
        <TextField placeholder="Enter a coupon here" v-model="field" />
        <Button type="submit">Apply</Button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.coupons {
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

.coupon-form-container {
  display: grid;
  gap: var(--spacing-xs);
}

.coupon-form {
  display: flex;
  gap: var(--spacing-sm);
}

.error {
  color: var(--color-danger);
  font-weight: var(--font-weight-bold);
  font-size: var(--text-small);
}
</style>
