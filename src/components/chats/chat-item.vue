<script setup lang="ts">
import { doc } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase/useFirestore'
import { format, isToday } from 'date-fns'
import { firestore } from '@/utils/firebase'
import type { User, UserNotification } from '@/utils/types'
import { avatarUrl } from '@/utils/profile'

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
    class="p-4 w-full b-b b-gray7 c-gray1 hover:bg-gray8 transition focus:bg-gray7 text-left"
  >
    <div class="flex gap2 justify-between items-center w-full h-12">
      <div class="w-15%">
        <img
          :src="`${avatarUrl}${user.username}`"
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
            <small
              v-if="notification"
              class="c-gray text-xs"
              :title="new Date(notification?.createdAt ?? '').toISOString()"
              >{{
                isToday(new Date(notification?.createdAt ?? ''))
                  ? format(new Date(notification?.createdAt ?? ''), 'k:mm')
                  : format(new Date(notification?.createdAt ?? ''), 'iii')
              }}</small
            >
          </div>
        </div>
        <p class="truncate c-gray" :title="notification?.message">{{ notification?.message }}</p>
      </div>
    </div>
  </button>
</template>
