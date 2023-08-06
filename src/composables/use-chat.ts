import { child, ref as dbRef, push, update } from 'firebase/database'
import { useRTDB } from '@vueuse/firebase/useRTDB'

import { db } from '@/utils/firebase'

export interface Chat {
  msg: string
  id: string
  createdAt: string
  member: {
    id: string
    username: string
  }
}

export const useChat = createGlobalState(() => {
  const { room } = useChatStore()
  const { id, username } = useUserStore()
  const chatRef = dbRef(db, 'rooms/' + room.id + '/chats')
  const chats = useRTDB<Chat[]>(chatRef)

  const sendChat = async (value: string) => {
    const newChatKey = push(child(dbRef(db), 'rooms/' + room.id + '/chats')).key
    const chatRef = dbRef(db, 'rooms/' + room.id + '/chats/' + newChatKey)

    await update(chatRef, {
      id: newChatKey,
      member: { id, username },
      msg: value,
      createdAt: new Date().toISOString()
    })
  }

  return { chats, sendChat, chatRef }
})
