<script setup lang="ts">
import { uid } from 'uid/secure'

const { $patch } = useUserStore()
const chatStore = useChatStore()

const username = ref('')

const submit = () => {
  $patch({ username: username.value, id: uid() })
  chatStore.$patch({ room: { id: '123' } })
  username.value = ''
}
</script>

<template>
  <form data-test="form" @submit.prevent="submit" class="my8">
    <input
      data-test="username"
      class="b focus:ring p2 rd mr2"
      placeholder="Username"
      type="text"
      v-model="username"
    />
    <button class="btn" type="submit">Submit</button>
  </form>
</template>
