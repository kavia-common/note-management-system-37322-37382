export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') as string
  const storage = event.context.storage ||= {}
  const notes = (storage.notes ||= [])
  const idx = (notes as any[]).findIndex((n: any) => n.id === id)
  if (idx === -1) throw createError({ statusCode: 404, statusMessage: 'Not found' })
  ;(notes as any[]).splice(idx, 1)
  setResponseStatus(event, 204)
  return null
})
