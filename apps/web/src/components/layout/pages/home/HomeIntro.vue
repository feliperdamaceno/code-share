<script setup lang="ts">
import Button from '@/components/primitives/Button.vue'

import ClockIcon from '@/assets/icons/clock.svg'
import TruckIcon from '@/assets/icons/truck.svg'
</script>

<template>
  <section class="introduction" id="introduction-section">
    <div class="column">
      <hgroup class="headline">
        <h1 id="introduction-section" class="title">
          Discover a new world of coding courses
        </h1>

        <p class="subtitle">
          Transform your way of thinking and embrace a new journey
        </p>
      </hgroup>

      <div class="information">
        <Button size="large" href="/catalog">Shop Now</Button>

        <div class="stats">
          <TruckIcon class="truck-icon" aria-hidden="true" />
          <p>Delivered Online</p>
        </div>

        <div class="stats">
          <ClockIcon class="clock-icon" aria-hidden="true" />
          <p>Immediate Access</p>
        </div>
      </div>
    </div>

    <div class="column">
      <img class="code-image" src="/images/code.svg" alt="" />
    </div>
  </section>
</template>

<style scoped>
.introduction {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xl);
}

.column {
  display: grid;
  flex: min(300px, 100%);
  align-content: start;
  gap: var(--spacing-md);
}

.headline {
  display: grid;
  gap: var(--spacing-md);
}

.headline .title {
  max-inline-size: 20ch;
  font-size: 4rem;
}

.headline .subtitle {
  color: var(--gray-5);
  font-weight: var(--font-weight-medium);
}

@media (800px >= width) {
  .headline .title {
    font-size: 3rem;
  }

  .code-image {
    max-inline-size: 500px;
  }
}

.information {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-lg);
}

.information .stats {
  display: flex;
  align-items: center;
  gap: 1ch;
  font-size: var(--text-lg);
}

.information :is(.truck-icon, .clock-icon) {
  width: 1.6rem;
  height: 1.6rem;
}

.information :is(.truck-icon, .clock-icon) * {
  color: var(--color-text);
  stroke-width: 1.5px;
}
</style>
