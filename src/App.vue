<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>

<template>
  <main class="relative max-w-screen-lg hfull mx-auto flex justify-center flex-col font-sans">
    <HomeView />
  </main>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

body {
  background-image: url(/layout-bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-color: black;
}
</style>
