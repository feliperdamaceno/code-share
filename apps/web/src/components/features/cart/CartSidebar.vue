<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

import CartItem from '@/components/features/cart/CartItem.vue'
import CouponsField from '@/components/features/cart/CouponsField.vue'
import Button from '@/components/primitives/Button.vue'

import { formatPrice } from '@/utils/ecomm'

import { useCartStore } from '@/stores/cart.store'

import CloseIcon from '@/assets/icons/close.svg'

const emit = defineEmits<{
  close: []
}>()

const cart = useCartStore()

const closeButtonRef = useTemplateRef<HTMLButtonElement>('close-button')
const previousElement = document.activeElement

onMounted(() => {
  if (closeButtonRef.value) {
    closeButtonRef.value.focus()
  }
})

onUnmounted(() => {
  if (previousElement && previousElement instanceof HTMLElement) {
    return previousElement.focus()
  }

  document.body.focus()
})
</script>

<template>
  <section
    ref="cart-sidebar"
    class="cart-sidebar"
    role="dialog"
    aria-modal="true"
  >
    <div class="cart-header">
      <h2 class="heading">Shopping Cart</h2>
      <button ref="close-button" class="close-button" @click="emit('close')">
        <CloseIcon class="close-icon" aria-hidden="true" />
      </button>
    </div>

    <div class="cart-items">
      <ul v-if="cart.size" class="cart-items-list" role="list">
        <li v-for="item in cart.products">
          <CartItem
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :image="item.image"
            :price="item.price"
            :discount="item.discount"
            :quantity="item.quantity"
          />
        </li>
      </ul>

      <p v-else>Your cart is empty.</p>
    </div>

    <div class="cart-footer">
      <hr class="divisor" />

      <CouponsField />

      <ul class="cart-information" role="list">
        <li class="subtotal">
          <span>Subtotal</span>
          <span>{{ formatPrice({ value: cart.subtotal }) }}</span>
        </li>

        <li v-if="cart.discount.total > 0" class="discount">
          <span>Discount (&#45;{{ cart.discount.percentage }}&#37;)</span>
          <span>&#45;{{ formatPrice({ value: cart.discount.total }) }}</span>
        </li>

        <li class="total">
          <strong>Total</strong>
          <strong>{{ formatPrice({ value: cart.total }) }}</strong>
        </li>
      </ul>

      <Button href="#" class="checkout-button" variant="secondary">
        Checkout
      </Button>
    </div>
  </section>
</template>

<style scoped>
.cart-sidebar {
  display: flex;
  z-index: 1000;
  position: fixed;
  flex-direction: column;
  align-content: start;
  inline-size: 100%;
  max-inline-size: 600px;
  inset: 0;
  left: unset;
  padding-inline: var(--spacing-lg);
  padding-block: var(--spacing-lg);
  gap: var(--spacing-md);
  border-width: 1px;
  border-style: solid;
  border-color: var(--light-3);
  background-color: var(--light-2);
  box-shadow: var(--shadow-lg);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.cart-header .heading {
  font-size: var(--text-xl);
}

.cart-header .close-button {
  --button-spacing: var(--spacing-sm);

  display: grid;
  place-items: center;
  margin-inline-end: calc(var(--button-spacing) * -1);
  margin-block-start: calc(var(--button-spacing) * -1);
  padding-inline: var(--button-spacing);
  padding-block: var(--button-spacing);
  border: none;
  border-radius: var(--border-xs);
  background-color: transparent;
  cursor: pointer;
}

.cart-header .close-icon {
  width: 2rem;
  height: 2rem;
}

.cart-items {
  padding-inline-end: var(--spacing-sm);
  overflow-y: auto;
  scrollbar-width: thin;
}

.cart-items-list {
  display: grid;
  gap: var(--spacing-md);
}

.cart-items-list > :not(:last-child) {
  padding-block-end: var(--spacing-md);
  border-block-end-color: var(--light-3);
  border-block-end-style: solid;
  border-block-end-width: 1px;
}

.cart-footer {
  display: grid;
  margin-block-start: auto;
  gap: var(--spacing-md);
}

.divisor {
  margin: 0;
  border: none;
  border-block-end-color: var(--light-3);
  border-block-end-style: solid;
  border-block-end-width: 1px;
}

.cart-information {
  display: grid;
  gap: var(--spacing-xs);
}

:is(.subtotal, .discount, .total) {
  display: flex;
  justify-content: space-between;
}

.cart-information .total {
  font-size: var(--text-lg);
}

.checkout-button {
  max-inline-size: 100%;
}
</style>
