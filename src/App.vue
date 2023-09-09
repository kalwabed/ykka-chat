<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>

<template>
  <main class="max-w-screen-lg hfull mx-auto flex flex-auto flex-col font-sans">
    <HomeView />
  </main>
  <footer class="w-full flex font-mono pb2">
    <a
      href="https://github.com/kalwabed/ykka-chat"
      class="text-center outline-none c-blue mx-auto inline-flex items-center gap1 focus:(ring-2 ring-blue)"
      title="Github repository"
      rel="noopener noreferrer"
      target="_blank"
      ><i class="i-ph:github-logo w4 h4"></i> Github</a
    >
  </footer>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
