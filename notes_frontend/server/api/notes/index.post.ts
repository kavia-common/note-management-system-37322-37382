import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ title: string; content: string }>(event)
  if (!body || typeof body.title !== 'string' || typeof body.content !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
  }
  const storage = event.context.storage ||= {}
  storage.notes ||= []
  const now = new Date().toISOString()
  const id = Math.random().toString(36).slice(2, 10)
  const note = { id, title: body.title, content: body.content, createdAt: now, updatedAt: now }
  storage.notes.push(note)
  return note
})
