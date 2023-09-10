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

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(17, 24, 39, 1);
}

::-webkit-scrollbar {
  width: 6px;
  background-color: rgba(17, 24, 39, 0);
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.3);
}

::-webkit-scrollbar-thumb:focus {
  background-color: rgba(156, 163, 175, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.2);
}
</style>
