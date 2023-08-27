import { child, ref as dbRef, push, update } from 'firebase/database'
import { defineStore } from 'pinia'

import { db } from '@/utils/firebase'
import type { User } from '@/utils/types'

export const useChatStore = defineStore('chat', {
  state: () => ({
    room: { id: '', receiver: null as User | null, sender: null as User | null }
  }),
  getters: {
    chatPath() {
      const path: string = 'rooms/' + this.room.id + '/chats'

      return path
    },
    chatRef() {
      const chatRef = dbRef(db, this.chatPath)

      return chatRef
    }
  },
  actions: {
    async sendChat(message: string) {
      const { currentUser } = useUserStore()
      const receiverId = this.room.receiver?.id

      const newChatKey = push(child(dbRef(db), this.chatPath)).key
      const newChatRef = dbRef(db, this.chatPath + '/' + newChatKey)
      const notificationKey = push(child(dbRef(db), 'users/' + receiverId + '/notifications')).key
      const receiverRef = dbRef(db, 'users/' + receiverId + '/notifications/' + notificationKey)

      await Promise.race([
        update(newChatRef, {
          message,
          id: newChatKey,
          sender: { id: currentUser?.id, username: currentUser?.username },
          createdAt: new Date().toISOString()
        }),
        update(receiverRef, {
          message,
          id: newChatKey,
          isRead: false,
          sender: { id: currentUser?.id, username: currentUser?.username },
          createdAt: new Date().toISOString()
        })
      ])
    }
  }
})
