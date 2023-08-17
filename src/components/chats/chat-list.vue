<script setup lang="ts">
import type { User } from '@/utils/types'
import ChatItem from './chat-item.vue'

const users = ref<User[]>([])
const { getUsers } = useUserStore()

onMounted(async () => {
  const usersData = await getUsers()
  users.value = usersData
})
</script>

<template>
  <div class="h-full overflow-auto flex flex-col w-3/4 b-y">
    <ChatItem :user="user" v-for="user in users" :key="user.id" />
  </div>
</template>
