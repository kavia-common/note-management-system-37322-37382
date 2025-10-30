<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNotes } from '~/composables/useNotes'
import NoteList from '~/components/notes/NoteList.vue'

const { notes, fetchNotes } = useNotes()
const q = ref('')
const filtered = computed(() => {
  if (!q.value.trim()) return notes.value
  const s = q.value.toLowerCase()
  return notes.value.filter(n =>
    n.title.toLowerCase().includes(s) || n.content.toLowerCase().includes(s)
  )
})

onMounted(fetchNotes)
</script>

<template>
  <div class="sidebar-inner">
    <div class="search">
      <input class="input" v-model="q" placeholder="Search notes..." />
    </div>
    <div class="note-list">
      <NoteList :items="filtered" />
    </div>
  </div>
</template>
