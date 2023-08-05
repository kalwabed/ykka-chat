import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [{ name: 'Calon', msg: 'Albed. Kabar bagaimana?' }] as { name: string; msg: string }[],
    room: { id: '404ca676-9b0c-4744-aa57-f7b1298c63c4', name: 'Master', members: [] }
  })
})
