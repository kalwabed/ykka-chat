<script setup lang="ts">
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { collection, doc, getDocs, or, query, where } from 'firebase/firestore'

import type { User } from '@/utils/types'
import ChatItem from './chat-item.vue'
import { firestore } from '@/utils/firebase'
import ChatListHeader from './chat-list-header.vue'

const search = ref('')
const searchedUsers = ref<User[]>([])

const isSearching = ref(false)
const isLoading = ref(false)
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

provide('chatListHeader', {
  isSearching,
  isLoading,
  search,
  searchedUsers
})

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
      isLoading.value = false
    }
  },
  { debounce: 1000 }
)

watchDebounced(
  search,
  () => {
    if (search.value) {
      isLoading.value = true
    }
  },
  { debounce: 300 }
)
</script>

<template>
  <div class="max-w-[43%] w-full rd-l">
    <ChatListHeader />
    <div class="h-full pt17 overflow-y-auto overflow-x-hidden flex wfull flex-col b-b b-l rd-l">
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
