<script setup lang="ts">
import ChatInput from '@/components/chat-input.vue'
import ChatList from '@/components/chat-list.vue'
import LoginForm from '@/components/login-form.vue'

const { room } = useChatStore()
const { id } = useUserStore()
</script>

<template>
  <div>
    <template v-if="id">
      <b>Room id: {{ room.id }}</b>
      <ChatList />
      <ChatInput />
    </template>
    <LoginForm v-else />
  </div>
</template>
