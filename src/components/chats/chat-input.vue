<script setup lang="ts">
const chatMsg = ref('')
const { sendChat } = useChatStore()

const onSend = async () => {
  await sendChat(chatMsg.value)
  chatMsg.value = ''
}
</script>

<template>
  <div class="absolute bottom-4 left-0 right-0 bg-white pt2">
    <div class="relative w-95% mx-auto">
      <input
        class="focus:(ring) hover:(bg-gray50 b-gray3) px3 py3 w-full overflow-hidden b transition rd-lg"
        data-test="chat-input"
        placeholder="Send your message..."
        type="text"
        v-model="chatMsg"
        @keyup.enter="onSend"
      />
      <button
        data-test="submit"
        class="absolute right-0 bottom-0 top-0 hover:bg-gray2 c-gray py2 px3 hfull focus:ring outline-none rd-r-lg transition"
        type="submit"
        @click="onSend"
      >
        <i class="block i-ph:paper-plane-right-duotone w5 h5"></i>
      </button>
    </div>
  </div>
</template>
