<template>
  <section class="bg-primary text-white py-32 px-12 text-center">
    <h2 class="font-cormorant font-bold mb-8 title">Ready to stop forgetting?</h2>
    <p class="text-xl mb-12 opacity-95">Start building durable knowledge today.</p>
    <router-link to="/dashboard">
      <Button label="Get Started" class="btn-cta" />
    </router-link>
  </section>
</template>

<style scoped lang="css">
.title {
  font-size: clamp(2rem, 5vw, 4rem);
}
.btn-cta {
  background-color: var(--p-slate-50);
  color: var(--p-primary-color);
  padding: 1rem 3rem;
  transition: opacity 0.15s;
}

.btn-cta:hover {
  background-color: var(--p-slate-50) !important;
  color: var(--p-primary-color) !important;
  opacity: 0.85;
}
</style>
