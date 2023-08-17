import { defineStore } from 'pinia'
import { addDoc, collection, updateDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '@/utils/firebase'

const usersRef = collection(firestore, 'users')

export const useUserStore = defineStore('user', {
  state: () => ({
    id: useLocalStorage('user/id', null) as Ref<string | null>,
    username: useLocalStorage('user/username', null) as Ref<string | null>
  }),
  actions: {
    async login(username: string) {
      const user = computed(() => {
        return query(usersRef, where('username', '==', username))
      })

      const userSnapshot = await getDocs(user.value)
      const isUserNotExist = userSnapshot.docs.length === 0

      if (isUserNotExist) {
        const createdUser = await addDoc(collection(firestore, 'users'), {
          username,
          fullname: username,
          createdAt: new Date().toISOString()
        })
        this.id = createdUser.id
      } else {
        this.id = userSnapshot.docs[0].id
      }
      this.username = username
    }
  }
})
