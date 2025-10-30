import { H3Event } from 'h3'

type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

function db(event: H3Event): Note[] {
  const storage = event.context.storage ||= {}
  storage.notes ||= [
    {
      id: '1',
      title: 'Welcome to Nuxt Notes',
      content: 'This is your first note. Edit or delete it, or create a new one!',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
  return storage.notes as Note[]
}

export default defineEventHandler((event) => {
  return db(event)
})
