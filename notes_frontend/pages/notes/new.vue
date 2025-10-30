<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from '#imports'
import NoteEditor from '~/components/notes/NoteEditor.vue'
import type { Note } from '~/composables/useNotes'
import { useNotes } from '~/composables/useNotes'

const router = useRouter()
const { createNote } = useNotes()
const toast = inject<{ push: (msg: string, type?: any, timeout?: number) => void }>('toast')

const model = ref<{ title: string; content: string }>({
  title: '',
  content: '',
})

async function save(note: { title: string; content: string }) {
  const created = await createNote(note)
  toast?.push('Note created', 'success')
  router.push(`/notes/${created.id}`)
}
</script>

<template>
  <div style="display:grid; gap:12px;">
    <h2 style="margin:0;">New Note</h2>
    <NoteEditor v-model="model" @save="save" />
  </div>
</template>
