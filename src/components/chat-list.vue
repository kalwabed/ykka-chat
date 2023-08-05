<script setup lang="ts">
const { chats } = useChat()
</script>

<template>
  <ul v-if="chats?.length !== 0">
    <li data-test="chat-msg" v-for="chat in chats" :key="chat.id">
      {{ chat.member.username }}: {{ chat.msg }}
    </li>
  </ul>
</template>
