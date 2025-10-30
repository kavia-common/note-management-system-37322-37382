export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') as string
  const storage = event.context.storage ||= {}
  const notes = (storage.notes ||= [])
  const note = (notes as any[]).find(n => n.id === id)
  if (!note) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  return note
})
