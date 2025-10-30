<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute, useRouter } from '#imports'

type Note = {
  id: string
  title: string
  content: string
  updatedAt: string
}

const props = defineProps<{ items: Note[] }>()
const route = useRoute()
const router = useRouter()

function openNote(id: string) {
  router.push(`/notes/${id}`)
}
</script>

<template>
  <div v-if="!items?.length" class="empty">
    <h3>No notes yet</h3>
    <p>Create your first note to get started.</p>
    <NuxtLink class="btn" to="/notes/new">Create Note</NuxtLink>
  </div>
  <div v-else style="display:grid; gap:8px;">
    <div
      v-for="n in items"
      :key="n.id"
      class="note-item"
      :class="{ active: route.params.id === n.id }"
      @click="openNote(n.id)"
    >
      <div>
        <h4>{{ n.title || 'Untitled' }}</h4>
        <p>{{ n.content.slice(0, 80) }}</p>
      </div>
      <small style="color:#9ca3af; align-self:center;">
        {{ new Date(n.updatedAt).toLocaleString() }}
      </small>
    </div>
  </div>
</template>
