import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [{ name: 'Calon', msg: 'Albed. Kabar bagaimana?' }] as { name: string; msg: string }[]
  })
})
