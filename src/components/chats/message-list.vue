<script setup lang="ts">
const bottomRef = ref<HTMLElement>()

const { id } = useUserStore()
const { chats } = useChat()

// Scroll to bottom when chats change
watchEffect(async () => {
  if (chats.value) {
    await nextTick()
    bottomRef.value?.scrollIntoView({ behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="p4 overflow-y-auto rd rd-b-0 h-83%">
    <ul v-if="chats?.length !== 0" class="flex flex-col justify-end gap.5">
      <small class="text-center c-gray6 mb4">Today</small>
      <li
        data-test="chat-msg"
        v-for="chat in chats"
        :key="chat.id"
        class="relative flex flex-col w-fit min-w-16 max-w-90% bg-teal7 b-teal6 rd pr2 pt1 pb5"
        :class="chat.member.id === id ? 'self-end' : 'c-red'"
      >
        <div class="c-teal50 px2 text-balance">{{ chat.msg }}</div>
        <span class="c-teal2 text-xs absolute bottom-1 right-2">{{
          new Intl.DateTimeFormat('id', { timeStyle: 'short' }).format(new Date(chat.createdAt))
        }}</span>
      </li>
      <li ref="bottomRef"></li>
    </ul>
  </div>
</template>
