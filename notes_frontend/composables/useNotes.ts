import { ref, computed } from 'vue'
import { apiFetch } from '~/utils/api'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const state = {
  notes: ref<Note[]>([]),
  loaded: ref(false),
  loading: ref(false),
}

function sortNotes(list: Note[]) {
  return [...list].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
}

// PUBLIC_INTERFACE
export function useNotes() {
  /**
   * This composable provides CRUD operations and reactive notes state.
   * It respects the active API target (internal mock server routes or external backend)
   * via the apiFetch wrapper which resolves the correct base URL using runtime feature flags.
   */
  const notes = state.notes
  const loading = state.loading
  const loaded = state.loaded
  const count = computed(() => notes.value.length)

  async function fetchNotes() {
    if (loading.value) return
    loading.value = true
    try {
      const data = await apiFetch<Note[]>('/notes')
      notes.value = sortNotes(data)
      loaded.value = true
    } finally {
      loading.value = false
    }
  }

  async function getNote(id: string) {
    const existing = notes.value.find(n => n.id === id)
    if (existing) return existing
    const item = await apiFetch<Note>(`/notes/${id}`)
    const idx = notes.value.findIndex(n => n.id === item.id)
    if (idx >= 0) notes.value[idx] = item
    else notes.value = sortNotes([...notes.value, item])
    return item
  }

  async function createNote(payload: { title: string; content: string }) {
    const item = await apiFetch<Note>('/notes', { method: 'POST', body: payload })
    notes.value = sortNotes([item, ...notes.value])
    return item
  }

  async function updateNote(id: string, payload: { title: string; content: string }) {
    const item = await apiFetch<Note>(`/notes/${id}`, { method: 'PUT', body: payload })
    const idx = notes.value.findIndex(n => n.id === id)
    if (idx >= 0) notes.value[idx] = item
    notes.value = sortNotes(notes.value)
    return item
  }

  async function deleteNote(id: string) {
    await apiFetch<void>(`/notes/${id}`, { method: 'DELETE' })
    notes.value = notes.value.filter(n => n.id !== id)
  }

  return { notes, count, loaded, loading, fetchNotes, getNote, createNote, updateNote, deleteNote }
}
