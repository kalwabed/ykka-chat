import { useRTDB } from '@vueuse/firebase/useRTDB'

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
  const { chatRef } = useChatStore()
  const chats = useRTDB<Chat[]>(chatRef)

  return { chats }
})
