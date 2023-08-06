<script setup lang="ts">
const chatMsg = ref('')
const { sendChat } = useChat()

const onSend = async () => {
  await sendChat(chatMsg.value)
  chatMsg.value = ''
}
</script>

<template>
  <div class="relative max-w-lg">
    <input
      class="focus:(ring b-transparent) hover:b-gray mr4 p2 w-full rd-b overflow-hidden b transition"
      data-test="chat-input"
      placeholder="Write something..."
      type="text"
      v-model="chatMsg"
      @keyup.enter="onSend"
    />
    <button
      data-test="submit"
      class="absolute right-0 bottom-0 top-0 hover:bg-gray2 c-gray py2 px3 w10.5 h10.5 rd-full focus:ring outline-none"
      type="submit"
      @click="onSend"
    >
      <i class="block i-ph:paper-plane-right-duotone w5 h5"></i>
    </button>
  </div>
</template>
