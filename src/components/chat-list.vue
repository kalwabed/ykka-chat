<script setup lang="ts">
const { chats } = useChatStore()
</script>

<template>
  <ul class="list">
    <li v-for="chat in chats" :key="chat.msg">{{ chat.name }}: {{ chat.msg }}</li>
  </ul>
</template>

<style scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
