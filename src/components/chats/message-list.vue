<script setup lang="ts">
import { ref as dbRef, onValue, type Unsubscribe } from 'firebase/database'
import { useDateFormat } from '@vueuse/core'

import type { Chat } from '@/utils/types'
import { db } from '@/utils/firebase'

const bottomRef = ref<HTMLElement>()

const { currentUser } = useUserStore()
const { room } = useChatStore()

const chats = ref<Chat[]>([])
const currentOnListener = ref<Unsubscribe>()

watch(room, () => {
  if (currentOnListener.value) {
    currentOnListener.value()
  }

  if (room.id) {
    const listener = onValue(dbRef(db, `rooms/${room.id}/chats`), (snapshot) => {
      chats.value = snapshot.val()
    })
    currentOnListener.value = listener
  }
})

// Scroll to bottom when chats change
watchEffect(async () => {
  if (chats.value) {
    await nextTick()
    bottomRef.value?.scrollIntoView({ behavior: 'smooth' })
  }
})
</script>

<template>
  <div v-if="room.id" class="p4 wfull overflow-y-auto rd rd-b-0 h-83%">
    <ul v-if="chats?.length !== 0" class="flex flex-col justify-end gap.5">
      <small class="text-center c-gray6 mb4">Today</small>
      <li
        data-test="chat-msg"
        v-for="chat in chats"
        :key="chat.id"
        class="relative flex flex-col w-fit min-w-16 max-w-90% bg-opacity-20 backdrop-blur-10 rd pr2 pt1 pb5"
        :class="
          chat.sender.id === currentUser.id ? 'self-end bg-gray b-gray8' : 'bg-green7 b-green'
        "
      >
        <div class="c-teal50 px2 text-balance">{{ chat.message }}</div>
        <span class="c-teal2 text-xs absolute bottom-1 right-2">{{
          useDateFormat(chat.createdAt, 'HH:mm', { locales: 'id' }).value
        }}</span>
      </li>
      <li ref="bottomRef"></li>
    </ul>
  </div>
</template>
