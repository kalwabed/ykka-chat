<script setup lang="ts">
import { useFirestore } from '@vueuse/firebase'
import { doc } from 'firebase/firestore'

import { firestore } from '@/utils/firebase'
import { avatarUrl } from '@/utils/profile'
import type { User } from '@/utils/types'

const searchInput = ref<HTMLInputElement>()
const chlProvider = inject<{
  isSearching: Ref<boolean>
  isLoading: Ref<boolean>
  search: Ref<string>
  searchedUsers: Ref<User[]>
}>('chatListHeader')

const { currentUser } = useUserStore()
const user = useFirestore(doc(firestore, 'users', currentUser.id)) as Ref<User>

async function onOpenSearch() {
  chlProvider!.isSearching.value = true
  await nextTick()
  searchInput.value?.focus()
}

function clearSearch() {
  chlProvider!.search.value = ''
  chlProvider!.searchedUsers.value = []
  chlProvider!.isLoading.value = false
}

const ProfileMenu = defineAsyncComponent(() => {
  return import('@/components/profile-menu.vue')
})
</script>

<template>
  <div
    class="px4 py1.5 max-w[27.5rem] wfull b-b sticky bg-gray-9 backdrop-blur-4 backdrop-filter bg-opacity-40 z20 b-l b-y b-gray7 rd-tl"
  >
    <div v-if="chlProvider?.isSearching.value" class="flex gap2 items-center py1.8">
      <button
        class="hover:(c-pink9 bg-pink1) transition rd-full p1"
        title="Back"
        @click="chlProvider.isSearching.value = false"
      >
        <i class="block i-ph:arrow-left w5 h5"></i>
      </button>
      <div class="relative wfull">
        <input
          ref="searchInput"
          v-model="chlProvider.search.value"
          placeholder="Search"
          class="b-b-2 wfull outline-none focus:b-pink py1.6 bg-transparent px2 transition"
        />
        <button class="absolute right-0 top-0 bottom-0 px2 transition" @click="clearSearch">
          <i class="i-ph:x block w4 h4 c-gray"></i>
        </button>
      </div>
    </div>
    <div v-else class="flex justify-between wfull items-center py.9">
      <div>
        <ProfileMenu>
          <img
            :src="`${avatarUrl}${user?.username}&radius=50`"
            class="b rd-full"
            width="40"
            height="40"
            alt="My profile"
          />
        </ProfileMenu>
      </div>
      <button @click="onOpenSearch" class="p2 rd-full hover:bg-gray8 transition">
        <i class="i-ph:magnifying-glass w4 h4 block"></i>
      </button>
    </div>
  </div>
</template>
