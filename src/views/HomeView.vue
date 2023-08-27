<script setup lang="ts">
import LoginForm from '@/components/login-form.vue'
import ChatCore from '@/components/chats/chat-core.vue'

const chatStore = useChatStore()
const userStore = useUserStore()

const logout = async () => {
  await userStore.clearUserSocket()
  userStore.$reset()
  chatStore.$reset()
}
</script>

<template>
  <div class="w-full">
    <button class="btn mb4 w-fit rd b-b-2" @click="logout">Logout</button>
    <b>Room id: {{ chatStore.room.id }}</b>
    <ChatCore v-if="userStore.currentUser?.id" />
    <LoginForm v-else />
  </div>
</template>
