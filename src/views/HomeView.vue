<script setup lang="ts">
import ChatInput from '@/components/chats/chat-input.vue'
import MessageList from '@/components/chats/message-list.vue'
import LoginForm from '@/components/login-form.vue'
import ChatList from '@/components/chats/chat-list.vue'

const chatStore = useChatStore()
const userStore = useUserStore()

const logout = () => {
  userStore.$patch({ id: null, username: null })
  chatStore.$reset()
}
</script>

<template>
  <div class="w-full">
    <button class="btn mb4 w-fit rd b-b-2" @click.once="logout">Logout</button>
    <b>Room id: {{ chatStore.room.id }}</b>
    <div class="flex my-8 h-3xl" v-if="userStore.$state.id">
      <ChatList />
      <div class="relative flex flex-col w-full mx-auto h-full bg-white b">
        <MessageList />
        <ChatInput />
      </div>
    </div>
    <LoginForm v-else />
  </div>
</template>
