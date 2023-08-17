import type { Chat } from '@/utils/types'
import { useRTDB } from '@vueuse/firebase/useRTDB'

export const useChat = createGlobalState(() => {
  const { chatRef } = useChatStore()
  console.log('🚀 ~ file: use-chat.ts:15 ~ useChat ~ chatRef:', chatRef.key)
  const chats = useRTDB<Chat[]>(chatRef)

  return { chats }
})
