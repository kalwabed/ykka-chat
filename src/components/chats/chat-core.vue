<script setup lang="ts">
import { avatarUrl } from '@/utils/profile'
import ChatList from './chat-list.vue'

const { room } = useChatStore()
const { currentUser } = useUserStore()

const ChatInput = defineAsyncComponent(() => {
  return import('./chat-input.vue')
})

const MessageList = defineAsyncComponent(() => {
  return import('./message-list.vue')
})
</script>

<template>
  <div class="flex my-8 h-3xl rd shadow">
    <ChatList />
    <div class="relative w-full mx-auto h-full bg-white b flex flex-col rd-r">
      <div v-if="room.id" class="flex justify-between h-15 w-full py2 px4 shadow b-b">
        <div class="flex items-center gap4">
          <img
            :src="`${avatarUrl}${room.receiver?.username}&radius=50&size=35`"
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
      <div v-else class="p4 m-auto flex flex-col justify-center">
        <i class="i-tabler:balloon w12 h12 mx-auto c-red"></i>
        <b class="text-lg">
          Welcome <span class="c-red">{{ currentUser.fullname }}</span> to YKKA chat!
        </b>
      </div>

      <template v-if="room.id">
        <Suspense>
          <MessageList />
        </Suspense>
        <Suspense>
          <ChatInput />
        </Suspense>
      </template>
    </div>
  </div>
</template>
