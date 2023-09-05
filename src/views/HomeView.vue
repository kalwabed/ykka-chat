<script setup lang="ts">
import LoginForm from '@/components/login-form.vue'
import ChatCore from '@/components/chats/chat-core.vue'

const userStore = useUserStore()
</script>

<template>
  <ChatCore v-if="userStore.currentUser?.id" />
  <LoginForm v-else />
</template>
