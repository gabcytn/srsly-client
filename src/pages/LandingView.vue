<script setup lang="ts">
import SignInModal from "@/components/auth/SignInModal.vue";
</script>

<template>
  <NavBar />
  <SignInModal />
  <main>
    <HeroSection />
    <PhilosophySection />
    <FeaturesSection />
    <ApproachSection />
    <AudienceSection />
    <CallToActionSection />
  </main>
  <FooterSection />
  <ScrollTop />
</template>
