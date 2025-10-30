<script setup lang="ts">
import NoteViewer from '~/components/notes/NoteViewer.vue'
import { useNotes } from '~/composables/useNotes'

const { notes, fetchNotes } = useNotes()
onMounted(fetchNotes)
</script>

<template>
  <div style="display:grid; gap:12px;">
    <NoteViewer :note="notes[0] || null">
      <div v-if="notes.length" style="display:flex; gap:8px; margin-top:8px;">
        <NuxtLink class="btn" :to="`/notes/${notes[0].id}`">Open</NuxtLink>
        <NuxtLink class="btn secondary" to="/notes/new">New Note</NuxtLink>
      </div>
    </NoteViewer>
  </div>
</template>
