<script setup lang="ts"></script>
<template>
  <section
    class="container py-8"
    v-animateonscroll="{
      enterClass: 'animate-enter fade-in-10 slide-in-from-b-20 animate-duration-1000',
    }"
  >
    <p class="uppercase text-[0.75rem] tracking-[0.15em] text-primary font-medium mt-10 mb-3">
      Spaced Repetition for Developers
    </p>
    <h1 class="title font-cormorant-garamond font-bold mb-8">
      Remember everything <br />
      you've learned
    </h1>
    <p class="subtitle text-light font-light mb-12 max-w-175">
      A spaced-repetition system designed specifically for LeetCode-style problems. Stop grinding
      new questions and start retaining the ones you've already solved.
    </p>
    <div class="flex gap-5">
      <router-link to="/dashboard">
        <Button label="Get Started" severity="contrast" class="hero-btn" />
      </router-link>
      <a href="https://github.com/gabcytn/srsly" target="_blank">
        <Button label="View on GitHub" severity="contrast" variant="outlined" class="hero-btn" />
      </a>
    </div>
  </section>
</template>

<style scoped lang="css">
.title {
  font-size: clamp(3.5rem, 8vw, 6.25rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}
.subtitle {
  font-size: clamp(1.25rem, 2.5vw, 1.4rem);
  line-height: 1.6;
}
.hero-btn {
  padding: 1rem 2rem;
}
</style>
