<script setup lang="ts">
import { doc } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { firestore } from '@/utils/firebase'
import type { User, UserNotification } from '@/utils/types'

const props = defineProps<{
  user: Partial<User>
  roomId: string
}>()

const roomStore = useChatStore()
const { currentUser } = useUserStore()
const userDoc = doc(firestore, 'users', currentUser.id)
const userFirestore = useFirestore(userDoc) as Ref<User>
const notification = ref<UserNotification>()

const openRoom = async () => {
  const existingRoom = userFirestore.value?.rooms?.find((r) => r.receiver.id === props.user.id)
  if (props.user?.id && existingRoom) {
    roomStore.$patch({
      room: {
        receiver: props.user,
        id: existingRoom.id,
        sender: currentUser
      }
    })
    return
  }

  roomStore.$patch({
    room: {
      receiver: props.user,
      id: props.roomId,
      sender: currentUser
    }
  })
}

watchEffect(() => {
  const notifications = userFirestore.value?.notifications ?? []
  if (notifications?.length > 0) {
    const filteredNotifications = notifications.filter((notif) => notif.sender.id === props.user.id)
    notification.value = filteredNotifications[filteredNotifications.length - 1]
  }
})
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
      <div class="w-85% flex flex-col">
        <div class="flex justify-between items-center">
          <b>{{ user.fullname }}</b>
          <div class="inline-flex gap1.5">
            <span v-if="notification" class="i-ph:checks w4 h4 rd-full c-green"></span>
            <small v-if="notification" class="c-gray text-xs">{{
              new Intl.DateTimeFormat('id', { timeStyle: 'short' }).format(
                new Date(notification?.createdAt ?? '')
              )
            }}</small>
          </div>
        </div>
        <p class="truncate c-gray5" :title="notification?.message">{{ notification?.message }}</p>
      </div>
    </div>
  </button>
</template>
