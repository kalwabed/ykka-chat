export interface User {
  id: string
  username: string
  fullname: string
  createdAt: string
}

export interface Chat {
  message: string
  id: string
  createdAt: string
  sender: Partial<User>
}
