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
        <div class="flex justify-between h-15 w-full py2 px4 shadow b-b">
          <div class="flex items-center gap4">
            <img
              src="https://api.dicebear.com/6.x/notionists-neutral/svg?seed=Felix&radius=50&size=35"
              alt="User profile"
              width="35"
              height="35"
              class=""
            />
            <div class="flex flex-col">
              <b>John Doe</b>
              <small class="c-gray6">Online</small>
            </div>
          </div>

          <div class="flex gap4 c-red">
            <button>
              <i class="i-ph:video block"></i>
            </button>
            <button>
              <i class="i-ph:phone block"></i>
            </button>
            <button>
              <i class="i-ph:dots-three-vertical-bold block"></i>
            </button>
          </div>
        </div>
        <MessageList />
        <ChatInput />
      </div>
    </div>
    <LoginForm v-else />
  </div>
</template>
