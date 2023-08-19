<script setup lang="ts">
import ChatInput from './chat-input.vue'
import ChatList from './chat-list.vue'
import MessageList from './message-list.vue'

const chatStore = useChatStore()
</script>

<template>
  <div class="flex my-8 h-3xl">
    <ChatList />
    <div class="relative flex flex-col w-full mx-auto h-full bg-white b">
      <div class="flex justify-between h-15 w-full py2 px4 shadow b-b">
        <div class="flex items-center gap4">
          <img
            :src="`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${chatStore.room.receiver?.username}&radius=50&size=35`"
            alt="User profile"
            width="35"
            height="35"
            class=""
          />
          <div class="flex flex-col">
            <b>{{ chatStore.room.receiver?.fullname }}</b>
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
</template>
