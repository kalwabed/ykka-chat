import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: useLocalStorage('user/id', '') as Ref<string>,
    username: useLocalStorage('user/username', '') as Ref<string>
  })
})
