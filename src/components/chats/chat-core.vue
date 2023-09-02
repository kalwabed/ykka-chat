<script setup lang="ts">
import ChatInput from './chat-input.vue'
import ChatList from './chat-list.vue'
import MessageList from './message-list.vue'

const { room } = useChatStore()
const { currentUser } = useUserStore()
</script>

<template>
  <div class="flex my-8 h-3xl rd shadow">
    <ChatList />
    <div class="relative w-full mx-auto h-full bg-white b flex flex-col rd-r">
      <div v-if="room.id" class="flex justify-between h-15 w-full py2 px4 shadow b-b">
        <div class="flex items-center gap4">
          <img
            :src="`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${room.receiver?.username}&radius=50&size=35`"
            alt="User profile"
            width="35"
            height="35"
            class=""
          />
          <div class="flex flex-col">
            <b>{{ room.receiver?.fullname }}</b>
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
      <b v-else class="p4 text-center">
        Welcome <span class="c-red">{{ currentUser.fullname }}</span> to the chat app!
      </b>

      <MessageList />
      <ChatInput v-if="room.id" />
    </div>
  </div>
</template>
