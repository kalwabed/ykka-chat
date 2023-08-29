export interface User {
  id: string
  username: string
  fullname: string
  createdAt: string
  rooms: Room[]
  notifications: UserNotification[]
}

export interface Room {
  id: string
  receiver: Partial<User>
  createdAt: string
}

export interface Chat {
  message: string
  id: string
  createdAt: string
  sender: Partial<User>
}

export interface UserNotification {
  createdAt: string
  id: string
  isRead: boolean
  message: string
  sender: {
    id: string
    username: string
  }
}
