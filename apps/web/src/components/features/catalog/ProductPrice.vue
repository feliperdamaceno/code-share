<script setup lang="ts">
import type { Discount } from '@code-share/shared/types/ecomm'

import { formatPrice, getDiscountAmount } from '@/utils/ecomm'

const { price, discount } = defineProps<{
  price: number
  discount: Discount
}>()

const discountAmount = getDiscountAmount({
  price,
  discount: discount.percentage
})
</script>

<template>
  <strong class="price">
    <span :class="{ discounted: discountAmount > 0 }">
      {{ formatPrice({ value: price }) }}
    </span>

    <span v-if="discountAmount > 0">
      {{ formatPrice({ value: price - discountAmount }) }}
    </span>

    <span v-if="discount.percentage" class="percentage">
      &#45;{{ discount.percentage }}&#37;
    </span>
  </strong>
</template>

<style scoped>
.price {
  display: flex;
  align-items: center;
  gap: 0.5ch;
  font-weight: var(--font-weight-medium);
  font-size: var(--text-xl);
  font-family: var(--font-heading);
}

.discounted {
  color: var(--color-danger);
  font-size: var(--text-small);
  text-decoration: line-through;
}

.percentage {
  padding-inline: 0.5em;
  padding-block-start: 0.15em;
  padding-block-end: 0.125em;
  border-radius: var(--border-rounded);
  background-color: var(--color-success);
  color: var(--light-2);
  font-size: 0.875rem;
  line-height: 1;
}
</style>
