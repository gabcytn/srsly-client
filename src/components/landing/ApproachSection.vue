<script setup lang="ts">
const approachLeft = [
  "Tracks solved problems",
  "Evaluates recall quality",
  "Dynamically adjusts review intervals",
  "Encourages deliberate re-attempts",
  "Reduces redundant problem grinding",
];

const approachRight = [
  "Anki's SM-2 spaced repetition",
  "Long-term learning principles from cognitive science",
  "Pattern recognition over time",
  "Active recall techniques",
  "Forgetting curve research",
];
</script>

<template>
  <section id="approach" class="py-20">
    <div class="container">
      <div
        class="text-center mb-24"
        v-animateonscroll="{
          enterClass: 'animate-enter fade-in-10 slide-in-from-b-8 animate-duration-1000',
        }"
      >
        <div class="text-xs uppercase tracking-[0.15em] text-primary mb-4 font-medium">
          The Methodology
        </div>
        <h2 class="font-cormorant text-6xl font-bold leading-tight tracking-tight max-md:text-4xl">
          How srsly works
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-24 mt-16 max-md:gap-16">
        <div>
          <h3 class="font-cormorant text-4xl font-semibold mb-8 max-md:text-3xl">
            What srsly does
          </h3>
          <ul class="list-none p-0 m-0">
            <li
              v-for="item in approachLeft"
              :key="item"
              class="py-6 border-b border-[#e0e0dc] text-light text-md flex items-start gap-4 last:border-b-0"
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000',
              }"
            >
              <span class="text-primary font-medium shrink-0">→</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-cormorant text-4xl font-semibold mb-8 max-md:text-3xl">Inspired by</h3>
          <ul class="list-none p-0 m-0">
            <li
              v-for="item in approachRight"
              :key="item"
              class="py-6 border-b border-[#e0e0dc] text-light text-md flex items-start gap-4 last:border-b-0"
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000',
              }"
            >
              <span class="text-primary font-medium shrink-0">→</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
