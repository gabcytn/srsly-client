<script setup lang="ts">
import Logo from "@/components/Logo.vue";
</script>

<template>
  <div class="min-h-dvh bg-[#F2F5F5] dark:bg-[#111111]">
    <header class="min-h-12 bg-[#fefefe] dark:bg-[#1d1d1d]">
      <div class="min-h-12 max-w-250 m-auto w-[90%] flex items-center">
        <router-link to="/" class="font-jetbrains-mono font-bold text-xl">
          <Logo />
        </router-link>
      </div>
    </header>
    <div class="flex items-center min-h-[calc(100dvh-6rem)]">
      <slot></slot>
    </div>
    <footer class="min-h-12 outline outline-gray-300 dark:outline-[#333]">
      <div class="min-h-12 max-w-250 m-auto w-[90%] flex items-center">
        <span class="text-xs text-zinc-500 dark:text-zinc-400"
          >Spaced repetition for developers.</span
        >
      </div>
    </footer>
  </div>
</template>
