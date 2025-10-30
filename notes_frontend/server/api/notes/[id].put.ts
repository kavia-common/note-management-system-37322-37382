import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string
  const body = await readBody<{ title: string; content: string }>(event)
  if (!body) throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
  const storage = event.context.storage ||= {}
  const notes = (storage.notes ||= [])
  const idx = (notes as any[]).findIndex((n: any) => n.id === id)
  if (idx === -1) throw createError({ statusCode: 404, statusMessage: 'Not found' })
  const prev = (notes as any[])[idx]
  const updated = { ...prev, ...body, updatedAt: new Date().toISOString() }
  ;(notes as any[])[idx] = updated
  return updated
})
