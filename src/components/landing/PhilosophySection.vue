<template>
  <section class="philosophy py-25 my-34">
    <div class="max-w-225 mx-auto w-[90%]">
      <blockquote
        class="text-center font-cormorant-garamond font-bold mb-8 italic"
        v-animateonscroll="{
          enterClass: 'animate-enter fade-in-10 slide-in-from-l-20 animate-duration-1000',
        }"
      >
        Optimize for long-term retention, <br />
        not interview panic mode.
      </blockquote>
      <p
        class="text-center text-[0.95rem] max-w-150 mx-auto"
        v-animateonscroll="{
          enterClass: 'animate-enter fade-in-10 slide-in-from-r-8 animate-duration-1000',
        }"
      >
        Most developers solve hundreds of algorithm problems and forget them weeks later. srsly
        changes that with intelligent review scheduling inspired by cognitive science.
      </p>
    </div>
  </section>
</template>

<style scoped lang="css">
.philosophy {
  background-color: var(--background-main-inverse);
  color: var(--background-main);
}

.philosophy blockquote {
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.philosophy p {
  line-height: 1.7;
  color: var(--p-zinc-400);
}
</style>
