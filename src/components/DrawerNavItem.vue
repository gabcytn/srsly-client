<script setup lang="ts">
defineProps<{
  iconClass: string;
  label: string;
}>();
defineEmits(["click"]);
</script>
<template>
  <li class="p-menu-item" :id="label.toLowerCase()" @click="$emit('click')">
    <div class="p-menu-item-content">
      <a href="#" class="flex items-center p-menu-item-link"
        ><span :class="iconClass" /><span class="text-sm">{{ label }}</span></a
      >
    </div>
  </li>
</template>

<style lang="css" scoped>
#logout {
  margin-top: auto;
}
</style>
