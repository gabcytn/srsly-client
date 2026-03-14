<script setup lang="ts">
import navItems from "@/shared/nav-items";
</script>
<template>
  <SidebarDrawer />
  <Menu :model="navItems" class="hidden md:flex w-70 h-dvh flex-col pb-5 bg-mycard sticky top-0">
    <template #start>
      <router-link to="/" class="inline-flex items-center gap-1 py-4 ps-5">
        <span class="text-xl font-semibold font-jetbrains-mono"
          ><span class="text-primary font-jetbrains-mono">srs</span>ly</span
        >
      </router-link>
    </template>
    <template #item="{ item, props }">
      <a v-ripple class="flex items-center" v-bind="props.action">
        <span :class="item.icon" style="font-size: 0.8rem" />
        <span class="text-sm">{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<style lang="css">
.p-menu-list {
  flex: 1;
}
.p-menu-item[aria-label="Logout"] {
  margin-top: auto;
}
</style>
