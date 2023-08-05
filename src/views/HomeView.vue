<script setup lang="ts">
import ChatInput from '@/components/chat-input.vue'
import ChatList from '@/components/chat-list.vue'

const { room } = useChatStore()
</script>

<template>
  <div>
    <b>Room id: {{ room.id }}</b>
    <ChatList />
    <ChatInput />
  </div>
</template>
