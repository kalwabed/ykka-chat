import { defineStore } from 'pinia'
import { addDoc, collection, doc, getDocs, query, where, getDoc } from 'firebase/firestore'
import { ref as dbRef, update } from 'firebase/database'

import { db, firestore } from '@/utils/firebase'
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
          createdAt: new Date().toISOString(),
          rooms: [],
          notifications: []
        })
        const user = await getDoc(doc(firestore, 'users', createdUser.id))
        this.currentUser = { id: user.id, ...user.data() } as User
        return {
          isAlreadyExist: false
        }
      } else {
        const user = userSnapshot.docs[0]
        this.currentUser = { id: user.id, ...user.data() } as User
        return {
          isAlreadyExist: true
        }
      }
    },
    async getUsers(): Promise<User[]> {
      const users = await getDocs(usersRef)
      return users.docs.map((user) => ({ id: user.id, ...user.data() })) as User[]
    },
    async createUserSocket(isRegisterNew: boolean) {
      if (!this.currentUser) {
        return
      }

      const userRef = dbRef(db, 'users/' + this.currentUser.id)
      if (isRegisterNew) {
        await update(userRef, {
          username: this.currentUser.username,
          isActive: new Date().toISOString()
        })
      } else {
        await update(userRef, {
          isActive: new Date().toISOString()
        })
      }
    },
    async clearUserSocket() {
      const userRef = dbRef(db, 'users/' + this.currentUser.id)
      await update(userRef, {
        isActive: null
      })
    }
  }
})
