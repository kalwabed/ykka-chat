<script setup lang="ts">
import { uid } from 'uid/secure'

import type { User } from '@/utils/types'

const props = defineProps<{
  user: User
}>()

const roomStore = useChatStore()
const { currentUser } = useUserStore()

const openRoom = () => {
  roomStore.$patch({
    room: {
      receiver: props.user,
      id: uid(),
      sender: currentUser
    }
  })
}
</script>

<template>
  <button
    @click="openRoom"
    class="p-4 w-full b-b hover:bg-gray50 transition focus:bg-gray1 text-left"
  >
    <div class="flex gap2 justify-between items-center w-full h-12">
      <div class="w-15%">
        <img
          :src="`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${user.username}`"
          alt="User picture"
          class="rd-full bg-white"
          width="50"
          height="50"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="w-68% flex flex-col">
        <b>{{ user.fullname }}</b>
        <p class="truncate c-gray5">Lorem ipsum dolor sit amet.</p>
      </div>
      <div class="flex items-end flex-col w-17%">
        <small class="c-gray">2m ago</small>
        <span class="i-ph:checks w6 h6 rd-full c-green"></span>
      </div>
    </div>
  </button>
</template>
