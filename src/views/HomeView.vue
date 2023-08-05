<script setup lang="ts">
import { ref } from 'vue'
import ChatList from '@/components/chat-list.vue'

const chatMsg = ref('')
const { $state } = useChatStore()

const onSend = () => {
  $state.chats.push({ name: 'me', msg: chatMsg.value })
}
</script>

<template>
  <div>
    <ChatList />
    <VTextField
      v-model="chatMsg"
      variant="underlined"
      append-inner-icon="mdi-send"
      single-line
      hide-details
      @keyup.enter="onSend"
      @click:append-inner="onSend"
    />
  </div>
</template>
