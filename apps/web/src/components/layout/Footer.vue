<script setup lang="ts">
import Button from '@/components/primitives/Button.vue'
</script>

<template>
  <footer class="footer--base full-bleed">
    <div class="container">
      <section class="info">
        <div class="subscription">
          <div class="message">
            <h2 class="heading">Don't miss anything!</h2>
            <p>Get the latest updates right in your mailbox.</p>
          </div>

          <div class="cta">
            <Button
              href="mailto:subscribe@codeshare.com?subject=I would like to subscribe on your product updates!"
              variant="accent"
            >
              Subscribe now
            </Button>
            <small>We will never send you spam, we promise!</small>
          </div>
        </div>

        <div class="links" role="navigation">
          <div class="link-group">
            <h3 class="heading">Home</h3>

            <ul class="list" role="list">
              <li>
                <RouterLink to="#">Discover</RouterLink>
              </li>
              <li>
                <RouterLink to="#">Featured</RouterLink>
              </li>
              <li>
                <RouterLink to="#">Benefits</RouterLink>
              </li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="heading">Shop</h3>

            <ul class="list" role="list">
              <li>
                <RouterLink to="#">Newest</RouterLink>
              </li>
              <li>
                <RouterLink to="#">Featured</RouterLink>
              </li>
              <li>
                <RouterLink to="#">Catalog</RouterLink>
              </li>
            </ul>
          </div>

          <div class="link-group">
            <h3 class="heading">Social</h3>

            <ul class="list" role="list">
              <li>
                <RouterLink to="#">Instagram</RouterLink>
              </li>
              <li>
                <RouterLink to="#">Facebook</RouterLink>
              </li>
              <li>
                <RouterLink to="#">Twitter</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr class="divisor" />

      <section class="brand">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 10.5">
          <text y="12.5" textLength="100%">CODE SHARE</text>
        </svg>
      </section>
    </div>
  </footer>
</template>

<style scoped>
.footer--base {
  background-color: var(--dark-7);
}

.container {
  display: grid;
  inline-size: 100%;
  max-inline-size: var(--app-container);
  margin-inline: auto;
  padding-inline: var(--spacing-md);
  padding-block-start: var(--spacing-xl);
  gap: var(--spacing-xl);
}

.footer--base * {
  color: var(--color-text-on-dark);
}

.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--spacing-xl);
}

.subscription {
  display: grid;
  align-content: start;
  gap: var(--spacing-md);
}

.subscription .message {
  display: grid;
  gap: var(--spacing-xs);
}

.subscription .message .heading {
  font-weight: var(--font-weight-bold);
  font-size: var(--text-heading-1);
}

.subscription .cta {
  display: grid;
  justify-content: start;
  gap: var(--spacing-sm);
}

.subscription small {
  color: var(--gray-5);
  font-weight: var(--font-weight-medium);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xl);
}

.link-group {
  display: grid;
  gap: var(--spacing-md);
}

.link-group .heading {
  font-size: var(--text-body);
}

.link-group .list {
  display: grid;
  gap: var(--spacing-md);
}

.divisor {
  height: 1px;
  margin: 0;
  border: none;
  background-color: var(--dark-6);
}

.brand {
  fill: var(--dark-6);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-heading);
}
</style>
