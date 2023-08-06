<script setup lang="ts">
const bottomRef = ref<HTMLElement>()

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
  <div class="p4 h-2xl max-w-lg overflow-y-auto b rd">
    <ul v-if="chats?.length !== 0" class="flex flex-col gap.5">
      <small class="text-center c-gray6">Today</small>
      <li
        data-test="chat-msg"
        v-for="chat in chats"
        :key="chat.id"
        class="flex flex-col w-fit max-w-3/4 bg-teal7 b-teal6 rd pr2 pb2 pt1"
      >
        <!-- <div class="flex items-center justify-between w-full">
          <b class="c-pink">{{ chat.member.username }}</b>
          <small class="c-amber text-xs">Dev</small>
        </div> -->
        <div class="c-teal50 pl2 pr12">{{ chat.msg }}</div>
        <small class="c-teal2 self-end -mt3.5">{{
          new Intl.DateTimeFormat('id', { timeStyle: 'short' }).format(new Date(chat.createdAt))
        }}</small>
      </li>
      <li ref="bottomRef"></li>
    </ul>
  </div>
</template>
