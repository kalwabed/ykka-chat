<script setup lang="ts">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { doc } from 'firebase/firestore'

import type { User } from '@/utils/types'
import ChatItem from './chat-item.vue'
import { firestore } from '@/utils/firebase'

const search = ref('')
const searchInput = ref<HTMLInputElement>()

const [isSearching, toggleSearching] = useToggle()
const { currentUser } = useUserStore()
const user = useFirestore(doc(firestore, 'users', currentUser.id)) as Ref<User>

async function onOpenSearch() {
  toggleSearching()
  await nextTick()
  searchInput.value?.focus()
}
</script>

<template>
  <div class="h-full overflow-auto flex flex-col w-3/4 b-y b-l">
    <div class="px4 py2.5 wfull b-b">
      <div v-if="isSearching" class="flex gap2 items-center">
        <button
          class="hover:(c-teal9 bg-teal1) transition rd-full p1"
          title="Back"
          @click="toggleSearching()"
        >
          <i class="block i-ph:arrow-left w5 h5"></i>
        </button>
        <div class="relative wfull">
          <input
            ref="searchInput"
            v-model="search"
            placeholder="Search"
            class="b-b-2 wfull outline-none focus:b-teal py1.6 transition"
          />
          <button class="absolute right-0 top-0 bottom-0 px2 transition" @click="search = ''">
            <i class="i-ph:x block w4 h4 c-gray"></i>
          </button>
        </div>
      </div>
      <div v-else class="flex justify-between items-center py.9">
        <div class="flex flex-col">
          <b>YKKA Chat</b>
        </div>

        <button @click="onOpenSearch" class="p2 rd-full hover:bg-gray1 transition">
          <i class="i-ph:magnifying-glass w4 h4 block"></i>
        </button>
      </div>
    </div>
    <div class="mx-auto c-gray mt6" v-if="isSearching">
      <p>Empty</p>
    </div>
    <template v-else>
      <ChatItem
        :user="data.receiver"
        :room-id="data.id"
        v-for="data in user?.rooms"
        :key="data.id"
      />
    </template>
  </div>
</template>
