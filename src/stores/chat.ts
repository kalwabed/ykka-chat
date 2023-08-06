import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    room: { id: '123', name: '', members: [] }
  })
})
