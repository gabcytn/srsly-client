<script setup lang="ts">
defineProps<{
  index: number;
  title: string;
  body: string;
}>();
</script>
<template>
  <div class="feature-card group relative pt-10" ref="featureCards">
    <div
      class="absolute top-0 left-0 w-10 h-0.5 bg-primary transition-all duration-400 card-underline group-hover:w-20"
    ></div>
    <div class="font-jetbrains-mono text-xs text-primary mb-4 tracking-wider">
      {{ index.toString().padStart(2, "0") }}
    </div>
    <h3 class="font-cormorant-garamond text-3xl font-semibold mb-4 leading-snug">
      {{ title }}
    </h3>
    <p class="text-light leading-relaxed">
      {{ body }}
    </p>
  </div>
</template>
