<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="max-w-screen-lg hfull mx-auto flex flex-auto flex-col">
    <RouterView />
  </main>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
