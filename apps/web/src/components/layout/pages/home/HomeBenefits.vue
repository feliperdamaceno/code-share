<template>
  <section id="benefits-section" class="benefits">
    <h2 class="headline">
      Explore a vast collection of
      <strong class="highlight">training</strong> material
    </h2>

    <div class="column">
      <h3>
        Learn, practice, and master coding with resources tailored to every
        skill level
      </h3>

      <p>
        Unlock a wide range of programming courses that cover essential
        foundations and advanced concepts alike. Each course is structured to
        make learning clear, practical, and engaging, helping you progress at
        your own pace.
      </p>

      <p>
        Put theory into action with real-world projects and interactive
        exercises. By practicing with industry-relevant challenges, you’ll not
        only strengthen your technical skills but also gain the confidence to
        apply them in professional environments.
      </p>
    </div>
  </section>
</template>

<style scoped>
.benefits {
  display: grid;
}

.headline {
  inline-size: 100%;
  max-inline-size: 50%;
  font-size: 3rem;
  text-wrap: initial;
}

.headline .highlight {
  color: var(--color-accent);
}

.column {
  display: grid;
  justify-self: end;
  inline-size: 100%;
  max-inline-size: 50%;
  gap: var(--spacing-md);
}

@media (800px >= width) {
  .benefits {
    row-gap: var(--spacing-lg);
  }

  :is(.headline, .column) {
    max-inline-size: 100%;
  }
}
</style>
