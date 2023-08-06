<script setup lang="ts">
import ChatInput from '@/components/chat-input.vue'
import ChatList from '@/components/chat-list.vue'
import LoginForm from '@/components/login-form.vue'

const chatStore = useChatStore()
const userStore = useUserStore()

const logout = () => {
  userStore.$patch({ id: null, username: null })
  chatStore.$reset()
}
</script>

<template>
  <div class="w-full">
    <template v-if="userStore.$state.id">
      <div class="my-8 flex flex-col w-lg mx-auto h-full">
        <button class="btn mb4 w-fit rd b-b-2" @click.once="logout">Logout</button>
        <b>Room id: {{ chatStore.room.id }}</b>
        <ChatList />
        <ChatInput />
      </div>
    </template>
    <LoginForm v-else />
  </div>
</template>
