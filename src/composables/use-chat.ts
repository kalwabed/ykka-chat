import { ref as dbRef, set, onValue } from 'firebase/database'
import { useRTDB } from '@vueuse/firebase/useRTDB'

import { db } from '@/utils/firebase'

export const useChat = createGlobalState(() => {
  const chatRef = dbRef(db, 'chats/' + '123')
  const chatDb = useRTDB(chatRef)
  const chat = ref()

  const setChat = async (value: string) => {
    await set(dbRef(db, 'chat' + '123'), value)
  }

  onValue(chatRef, (snapshot) => {
    const data = snapshot.val()
    console.log('🚀 ~ file: use-chat.ts:17 ~ onValue ~ data:', data)
    chat.value = data
  })

  return { chat, setChat, chatRef }
})
