<script setup lang="ts">
const audienceCards = [
  {
    title: 'Long-term Prep',
    description:
      'Preparing for technical interviews over months, not weeks. You want to build lasting knowledge, not cram and forget.',
  },
  {
    title: 'Pattern Retention',
    description:
      'Engineers who value understanding problem patterns and being able to recognize them months later, not just solving them once.',
  },
  {
    title: 'Structured Learning',
    description:
      'Learners who prefer systematic review over random grinding. You believe in deliberate practice and evidence-based study methods.',
  },
]
</script>

<template>
  <section id="audience" class="max-w-300 mx-auto py-40 px-12 max-md:py-24 max-md:px-6">
    <div
      class="text-center mb-24"
      v-animateonscroll="{
        enterClass: 'animate-enter fade-in-10 slide-in-from-b-8 animate-duration-1000',
      }"
    >
      <div class="text-xs uppercase tracking-[0.15em] text-primary mb-4 font-medium">
        Who Is This For
      </div>
      <h2
        class="font-cormorant text-6xl font-bold leading-tight mb-6 tracking-tight max-md:text-4xl"
      >
        Built for serious learners
      </h2>
      <p class="text-lg text-light max-w-150 mx-auto">
        srsly is for developers who understand that interview prep is a marathon, not a sprint.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      <div
        v-for="(card, index) in audienceCards"
        :key="index"
        class="audience-card p-card"
        v-animateonscroll="{
          enterClass: 'animate-enter fade-in-10 slide-in-from-r-8 animate-duration-1000',
        }"
      >
        <div class="p-card-body">
          <div class="p-card-content">
            <h3 class="font-cormorant-garamond text-3xl font-semibold mb-4 leading-snug">
              {{ card.title }}
            </h3>
            <p class="text-light leading-relaxed">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css">
.p-card {
  background: var(--background-main);
  border: 2px solid #e0e0dc;
  border-radius: 0;
  box-shadow: none;
  transition: all 0.4s ease;
}

.p-card:hover {
  border-color: var(--p-primary-color);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.p-card .p-card-body {
  padding: 3rem;
}

.p-card .p-card-content {
  padding: 0;
}
</style>
