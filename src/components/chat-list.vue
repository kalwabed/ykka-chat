<script setup lang="ts">
import { onValue } from 'firebase/database'

const { chat, chatRef } = useChat()
const { chats, $state } = useChatStore()

watchEffect(() => {
  console.log(chat.value)
})

onValue(chatRef, (snapshot) => {
  const data = snapshot.val()
  console.log('🚀 ~ file: chat-list.vue:13 ~ onValue ~ data:', data)
  $state.chats.push({ name: 'other', msg: data })
})
</script>

<template>
  <ul>
    <li data-test="chat-msg" v-for="chat in chats" :key="chat.msg">
      {{ chat.name }}: {{ chat.msg }}
    </li>
  </ul>
</template>
