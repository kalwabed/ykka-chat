<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <VLayout>
    <VMain class="mt-12 width mx-auto">
      <RouterView />
    </VMain>
  </VLayout>
</template>

<style scoped>
.width {
  max-width: 1024px;
}
</style>
