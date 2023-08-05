import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const app = initializeApp({
  apiKey: import.meta.env.FIREBASE_API_KEY,
  appId: import.meta.env.FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
})
console.log(
  '🚀 ~ file: firebase.ts:8 ~ import.meta.env.VITE_FIREBASE_DATABASE_URL:',
  import.meta.env.VITE_FIREBASE_DATABASE_URL
)
const db = getDatabase(app)

export { db, app }
