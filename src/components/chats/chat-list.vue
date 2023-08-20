<script setup lang="ts">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { doc } from 'firebase/firestore'

import type { User } from '@/utils/types'
import ChatItem from './chat-item.vue'
import { firestore } from '@/utils/firebase'

const [isShowSearch, toggleShowSearch] = useToggle()
const { currentUser } = useUserStore()
const user = useFirestore(doc(firestore, 'users', currentUser.id)) as Ref<User>
</script>

<template>
  <div class="h-full overflow-auto flex flex-col w-3/4 b-y b-l">
    <div class="px4 py2.5 wfull b-b">
      <div v-if="isShowSearch" class="flex gap2 items-center">
        <button
          class="hover:(c-teal9 bg-teal1) transition rd-full p1"
          title="Back"
          @click="toggleShowSearch()"
        >
          <i class="block i-ph:arrow-left w5 h5"></i>
        </button>
        <input
          type="text"
          placeholder="Search"
          class="b-b-2 wfull outline-none focus:b-teal py1.6 transition"
        />
      </div>
      <div v-else class="flex justify-between items-center py.9">
        <div class="flex flex-col">
          <b>YKKA Chat</b>
        </div>

        <button @click="toggleShowSearch()" class="p2 rd-full hover:bg-gray1 transition">
          <i class="i-ph:magnifying-glass w4 h4 block"></i>
        </button>
      </div>
    </div>
    <ChatItem :user="data.receiver" :room-id="data.id" v-for="data in user?.rooms" :key="data.id" />
  </div>
</template>
