<script setup lang="ts">
import ContactForm from '@/components/forms/ContactForm.vue'
</script>

<template>
  <section class="container" aria-labelledby="contact-us-title">
    <div class="col">
      <div class="headline">
        <h2 id="contact-us-title">Contact Us</h2>

        <p class="information">
          Have a question about our products or pricing? Fill in this form to
          get in touch with us.
        </p>
      </div>

      <img class="chat-image" src="/images/chat.svg" alt="" />
    </div>

    <div class="col">
      <ContactForm />
      <img class="faq-image" src="/images/faq.svg" alt="" />
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding-inline: var(--spacing-md);
  gap: var(--spacing-xl);
}

.col {
  display: grid;
  flex: min(400px, 100%);
  align-content: space-between;
  gap: var(--spacing-lg);
}

.headline {
  display: grid;
  gap: var(--spacing-md);
}

.headline .information {
  color: var(--gray-5);
  font-weight: var(--font-weight-medium);
}

.chat-image {
  justify-self: start;
  inline-size: 100%;
  max-inline-size: 500px;
}

@media (940px >= width) {
  .chat-image {
    display: none;
  }
}

.faq-image {
  justify-self: end;
  inline-size: 100%;
  max-inline-size: 300px;
}
</style>
