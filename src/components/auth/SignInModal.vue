<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { Dialog } from "primevue";
import { GoogleLogin } from "vue3-google-login";
import Google from "@primeicons/vue/google";
import GitHub from "@primeicons/vue/github";
const authStore = useAuthStore();
const { isSignInModalOpen } = storeToRefs(authStore);

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/auth/oauth/github/callback`;

function googleCallback(response: any) {
  console.log(response);
}

function navigateToGitHub() {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user`;
  window.location.href = githubAuthUrl;
}
</script>

<template>
  <Dialog v-model:visible="isSignInModalOpen" modal header="Sign In" class="max-w-125 w-[90%]">
    <!-- <h4 class="text-xs text-primary">WELCOME BACK</h4> -->
    <h1 class="font-cormorant-garamond text-4xl">Welcome to srsly!</h1>
    <span class="text-sm my-2 block">Start remembering. Your reviews are waiting.</span>
    <div class="flex flex-col gap-2 mt-5">
      <Button class="w-full" severity="contrast" @click="navigateToGitHub">
        <GitHub />Continue with GitHub
      </Button>
      <GoogleLogin :callback="googleCallback" class="w-full">
        <Button class="w-full" severity="secondary">
          <Google />
          Continue with Google</Button
        >
      </GoogleLogin>
    </div>
  </Dialog>
</template>
