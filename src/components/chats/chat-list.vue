<script setup lang="ts">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { doc } from 'firebase/firestore'
import type { User } from '@/utils/types'
import ChatItem from './chat-item.vue'
import { firestore } from '@/utils/firebase'

const { currentUser } = useUserStore()
const user = useFirestore(doc(firestore, 'users', currentUser.id)) as Ref<User>
</script>

<template>
  <div class="h-full overflow-auto flex flex-col w-3/4 b-y">
    <ChatItem :user="data.receiver" :room-id="data.id" v-for="data in user?.rooms" :key="data.id" />
  </div>
</template>
