<script setup lang="ts">
import FeatureCard from "./FeatureCard.vue";

const features = [
  {
    number: "01",
    title: "SM-2 Inspired Scheduling",
    description:
      "Using the same algorithm that powers Anki, srsly intelligently schedules reviews based on your performance and recall quality.",
  },
  {
    number: "02",
    title: "Adaptive Intervals",
    description:
      "Review intervals dynamically adjust based on how well you remember each problem. Struggle? See it sooner. Ace it? Longer gaps.",
  },
  {
    number: "03",
    title: "Late Review Rewards",
    description:
      "Cramming works. The system rewards late reviews. Remembering after the scheduled date proves real retention — and we reward that.",
  },
  {
    number: "04",
    title: "AI-Powered Critiques",
    description:
      "Get intelligent feedback on your solutions. Understand not just what works, but why, and how to improve your approach.",
  },
  {
    number: "05",
    title: "Pattern Recognition",
    description:
      "Track your progress across problem categories and data structures. Identify weak areas and watch your pattern recognition improve over time.",
  },
  {
    number: "06",
    title: "Complete History",
    description:
      "Every attempt, every review, every insight preserved. See your learning journey and celebrate how far you've come.",
  },
];
</script>

<template>
  <section id="features" class="container py-20">
    <div class="text-center mb-24">
      <div
        class="text-xs uppercase tracking-[0.15em] text-primary mb-4 font-medium"
        v-animateonscroll="{
          enterClass: 'animate-enter fade-in-10 slide-in-from-b-8 animate-duration-1000',
        }"
      >
        What Makes It Different
      </div>
      <h2
        class="font-cormorant text-6xl font-bold leading-tight mb-6 tracking-tight max-md:text-4xl"
        v-animateonscroll="{
          enterClass: 'animate-enter fade-in-10 slide-in-from-b-8 animate-duration-1000',
        }"
      >
        Built for durable understanding
      </h2>
      <p
        class="text-lg max-w-150 mx-auto"
        v-animateonscroll="{
          enterClass: 'animate-enter fade-in-10 slide-in-from-b-8 animate-duration-1000',
        }"
      >
        Every feature is designed around one goal: helping you retain what you learn, permanently.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 gap-x-12 mt-16 max-md:gap-12">
      <FeatureCard
        v-for="(feature, idx) in features"
        :key="idx"
        :index="idx + 1"
        :title="feature.title"
        :body="feature.description"
        v-animateonscroll="{
          enterClass: `animate-enter fade-in-10 ${idx > 2 ? 'slide-in-from-r-8' : 'slide-in-from-l-8'} animate-duration-1000 `,
        }"
      />
    </div>
  </section>
</template>
