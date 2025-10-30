<script setup lang="ts">
import { ref, watchEffect, inject } from 'vue'
import { useRoute, useRouter } from '#imports'
import NoteEditor from '~/components/notes/NoteEditor.vue'
import NoteViewer from '~/components/notes/NoteViewer.vue'
import ConfirmDeleteModal from '~/components/ConfirmDeleteModal.vue'
import { useNotes, type Note } from '~/composables/useNotes'

const route = useRoute()
const router = useRouter()
const { getNote, updateNote, deleteNote } = useNotes()
const toast = inject<{ push: (msg: string, type?: any, timeout?: number) => void }>('toast')

const note = ref<Note | null>(null)
const editing = ref(false)
const showDelete = ref(false)

watchEffect(async () => {
  const id = route.params.id as string
  if (!id) return
  note.value = await getNote(id)
})

async function onSave(payload: { title: string; content: string }) {
  if (!note.value) return
  const updated = await updateNote(note.value.id, payload)
  note.value = updated
  toast?.push('Note updated', 'success')
  editing.value = false
}

async function onDelete() {
  if (!note.value) return
  await deleteNote(note.value.id)
  toast?.push('Note deleted', 'success')
  showDelete.value = false
  router.push('/notes')
}
</script>

<template>
  <div v-if="!note" class="empty">
    <h3>Loading...</h3>
  </div>
  <div v-else style="display:grid; gap:12px;">
    <div style="display:flex; gap:8px; align-items:center;">
      <button v-if="!editing" class="btn" @click="editing = true">Edit</button>
      <button v-else class="btn secondary" @click="editing = false">Cancel</button>
      <button class="btn danger" @click="showDelete = true">Delete</button>
    </div>

    <NoteEditor
      v-if="editing"
      :model-value="{ title: note.title, content: note.content }"
      @update:modelValue="(v:any) => (note = { ...note!, title: v.title, content: v.content } as any)"
      @save="onSave"
    />

    <NoteViewer v-else :note="note" />

    <ConfirmDeleteModal :open="showDelete" :title="note?.title" @confirm="onDelete" @close="showDelete = false" />
  </div>
</template>
