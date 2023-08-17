import { defineStore } from 'pinia'
import { addDoc, collection, doc, getDocs, query, where, getDoc } from 'firebase/firestore'

import { firestore } from '@/utils/firebase'
import type { User } from '@/utils/types'

const usersRef = collection(firestore, 'users')

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: {} as User
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
        const user = await getDoc(doc(firestore, 'users', createdUser.id))
        this.currentUser = { id: user.id, ...user.data() } as User
      } else {
        const user = userSnapshot.docs[0]
        this.currentUser = { id: user.id, ...user.data() } as User
      }
    },
    async getUsers(): Promise<User[]> {
      const users = await getDocs(usersRef)
      return users.docs.map((user) => ({ id: user.id, ...user.data() })) as User[]
    }
  }
})
