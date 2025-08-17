<script setup lang="ts"></script>

<template>
  <section class="circles" aria-labelledby="circles">
    <img src="/images/circles.svg" alt="" />

    <h2 id="circles" class="headline">
      <span>Curated by</span>
      <br />
      <span class="highlight">Experts</span>
    </h2>
  </section>
</template>

<style scoped>
.circles {
  display: grid;
  position: relative;
  row-gap: var(--spacing-lg);
}

.headline {
  display: flex;
  gap: 0.2ch;
  font-weight: var(--font-weight-bold);
  font-size: 1.8rem;
  font-family: var(--font-family-body);
}

@media (620px <= width) {
  .headline {
    display: block;
    position: absolute;
    bottom: 0;
    left: 10%;
    font-size: 2rem;
  }
}

@media (980px <= width) {
  .headline {
    bottom: 3rem;
    left: 18%;
    font-size: 2.4rem;
  }
}

.headline .highlight {
  color: var(--color-accent);
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: var(--color-accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.5rem;
}
</style>
