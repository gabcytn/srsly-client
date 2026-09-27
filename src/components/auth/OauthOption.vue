<script setup lang="ts">
defineProps<{
  signInMethod: "github" | "google";
}>();
</script>

<template>
  <div class="w-full">
    <Button
      :label="signInMethod === 'github' ? 'Github' : 'Google'"
      :icon="signInMethod === 'github' ? 'pi pi-github' : 'pi pi-google'"
      severity="secondary"
      class="w-full border border-gray-300! dark:border-none!"
    />
  </div>
</template>
