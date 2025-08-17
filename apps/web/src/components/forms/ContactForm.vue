<script setup lang="ts">
import { reactive, ref } from 'vue'

import Button from '@/components/primitives/Button.vue'
import EmailField from '@/components/primitives/EmailField.vue'
import TextBox from '@/components/primitives/TextBox.vue'
import TextField from '@/components/primitives/TextField.vue'

const sent = ref(false)
const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const onSubmit = () => {
  sent.value = true

  formData.name = ''
  formData.email = ''
  formData.message = ''
}
</script>

<template>
  <form class="contact-form" @submit.prevent="onSubmit">
    <p v-if="sent" class="alert-message" aria-live="polite">
      Your message has been received 🫡
    </p>

    <TextField
      name="full-name"
      placeholder="Full Name"
      label="Name"
      autocomplete="on"
      :required="true"
      v-model="formData.name"
    />

    <EmailField
      name="email"
      placeholder="Eg. example@email.com"
      label="Email"
      autocomplete="on"
      :required="true"
      v-model="formData.email"
    />

    <TextBox
      name="message"
      placeholder="Write us a message."
      label="Message"
      size="medium"
      autocomplete="on"
      :required="true"
      v-model="formData.message"
    />

    <Button variant="secondary" type="submit">Share your Thoughts</Button>
  </form>
</template>

<style scoped>
.contact-form {
  display: grid;
  gap: var(--spacing-lg);
}

.alert-message {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
  border-radius: var(--border-xs);
  background-color: var(--color-success);
  color: var(--light-2);
}
</style>
