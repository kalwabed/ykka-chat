export interface User {
  id: string
  username: string
  fullname: string
  createdAt: string
  rooms: Room[]
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
