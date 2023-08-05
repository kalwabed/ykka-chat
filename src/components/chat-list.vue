<script setup lang="ts">
const { chats } = useChatStore()
</script>

<template>
  <ul>
    <li data-test="chat-msg" v-for="chat in chats" :key="chat.msg">
      {{ chat.name }}: {{ chat.msg }}
    </li>
  </ul>
</template>
