<script setup lang="ts">
import ChatItem from './chat-item.vue'

const users = ref<
  { id: string; name: string; username: string; company: { catchPhrase: string } }[]
>([])

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await res.json()
  users.value = data
}

onMounted(fetchUsers)
</script>

<template>
  <div class="h-full overflow-auto flex flex-col w-3/4 b-y">
    <ChatItem :user="user" v-for="user in users" :key="user.id" />
  </div>
</template>
