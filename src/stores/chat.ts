import { child, ref as dbRef, push, update } from 'firebase/database'
import { defineStore } from 'pinia'

import { db } from '@/utils/firebase'

export const useChatStore = defineStore('chat', {
  state: () => ({
    room: { id: '123', name: '', members: [] }
  }),
  getters: {
    chatPath: () => {
      const { room } = useChatStore()
      const path: string = 'rooms/' + room.id + '/chats'

      return path
    },
    chatRef() {
      const chatRef = dbRef(db, this.chatPath)

      return chatRef
    }
  },
  actions: {
    async sendChat(value: string) {
      const { id, username } = useUserStore()

      const newChatKey = push(child(dbRef(db), this.chatPath)).key
      const newChatRef = dbRef(db, this.chatPath + '/' + newChatKey)

      await update(newChatRef, {
        id: newChatKey,
        member: { id, username },
        msg: value,
        createdAt: new Date().toISOString()
      })
    }
  }
})
