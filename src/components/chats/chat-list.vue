<script setup lang="ts">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { collection, doc, getDocs, or, query, where } from 'firebase/firestore'

import type { User } from '@/utils/types'
import ChatItem from './chat-item.vue'
import { firestore } from '@/utils/firebase'

const search = ref('')
const searchInput = ref<HTMLInputElement>()
const searchedUsers = ref<User[]>([])

const [isSearching, toggleSearching] = useToggle(false)
const [isLoading, toggleLoading] = useToggle(false)
const { currentUser } = useUserStore()
const user = useFirestore(doc(firestore, 'users', currentUser.id)) as Ref<User>
const getUsersWithoutCurrentUser = computed(() => {
  return query(collection(firestore, 'users'), where('username', '!=', currentUser.username))
})
const users = computedAsync(async () => {
  const usersSnapshot = await getDocs(getUsersWithoutCurrentUser.value)
  const users: User[] = []
  usersSnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() } as User)
  })

  return users
}, [])

watchDebounced(
  search,
  async () => {
    if (search.value) {
      const usersRef = collection(firestore, 'users')
      const q = query(
        usersRef,
        or(where('fullname', '==', search.value), where('username', '==', search.value))
      )
      const querySnapshot = await getDocs(q)
      const users: User[] = []
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as User)
      })
      searchedUsers.value = users
      toggleLoading(false)
    }
  },
  { debounce: 1000 }
)

watchDebounced(
  search,
  () => {
    if (search.value) {
      toggleLoading()
    }
  },
  { debounce: 300 }
)

async function onOpenSearch() {
  toggleSearching()
  await nextTick()
  searchInput.value?.focus()
}

function clearSearch() {
  search.value = ''
  searchedUsers.value = []
  toggleLoading(false)
}
</script>

<template>
  <div class="w-[43%]">
    <div class="px4 py2.5 w[27.42rem] b-b fixed bg-white z20 b-l b-y">
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
          <button class="absolute right-0 top-0 bottom-0 px2 transition" @click="clearSearch">
            <i class="i-ph:x block w4 h4 c-gray"></i>
          </button>
        </div>
      </div>
      <div v-else class="flex justify-between wfull items-center py.9">
        <div class="flex flex-col">
          <b>YKKA Chat</b>
        </div>
        <button @click="onOpenSearch" class="p2 rd-full hover:bg-gray1 transition">
          <i class="i-ph:magnifying-glass w4 h4 block"></i>
        </button>
      </div>
    </div>

    <div class="h-full pt15 overflow-auto flex wfull flex-col b-b b-l">
      <p v-if="isLoading" class="mx-auto c-gray">Loading...</p>
      <Transition>
        <div class="c-gray" v-if="isSearching">
          <div v-if="searchedUsers.length > 0">
            <p class="p2">Search Result</p>
            <ChatItem
              v-for="user in searchedUsers"
              :key="user.id"
              :user="user"
              :room-id="`${user.id}-${currentUser.id}`"
            />
          </div>
          <p v-if="searchedUsers.length === 0 && search && !isLoading" class="text-center p2">
            Empty
          </p>
          <template v-if="users.length > 0 && !search">
            <ChatItem
              v-for="user in users"
              :key="user.id"
              :user="user"
              :room-id="`${user.id}-${currentUser.id}`"
            />
          </template>
        </div>
      </Transition>
      <Transition appear>
        <div v-if="!isSearching">
          <ChatItem
            v-for="data in user?.rooms"
            :user="data.receiver"
            :room-id="data.id"
            :key="data.id"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
