<script setup lang="ts">
const chatMsg = ref('')
const { sendChat } = useChat()

const onSend = async () => {
  await sendChat(chatMsg.value)
  chatMsg.value = ''
}
</script>

<template>
  <input
    class="focus:(ring b-transparent) b mr4"
    data-test="chat-input"
    type="text"
    v-model="chatMsg"
    @keyup.enter="onSend"
  />
  <button data-test="submit" class="btn" type="submit" @click="onSend">Send</button>
</template>
