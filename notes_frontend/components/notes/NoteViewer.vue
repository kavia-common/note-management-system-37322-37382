<script setup lang="ts">
import { defineProps } from 'vue'

type Note = {
  id: string
  title: string
  content: string
  updatedAt: string
}

defineProps<{ note: Note | null }>()
</script>

<template>
  <div v-if="!note" class="empty">
    <h3>Select a note</h3>
    <p>Choose a note from the list to view it here.</p>
  </div>
  <div v-else class="card" style="padding:20px; display:grid; gap:10px;">
    <div style="display:flex; align-items:center; justify-content:space-between;">
      <h2 style="margin:0;">{{ note.title || 'Untitled' }}</h2>
      <small style="color:#6b7280;">Updated {{ new Date(note.updatedAt).toLocaleString() }}</small>
    </div>
    <div style="white-space:pre-wrap; color:#374151;">{{ note.content }}</div>
    <slot />
  </div>
</template>
