import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: useLocalStorage('user/id', null) as Ref<string | null>,
    username: useLocalStorage('user/username', null) as Ref<string | null>
  })
})
