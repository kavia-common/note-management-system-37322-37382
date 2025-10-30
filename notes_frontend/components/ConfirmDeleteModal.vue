<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
const props = defineProps<{ open: boolean; title?: string }>()
const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <teleport to="body">
    <div v-if="open" style="position:fixed; inset:0; z-index:60;">
      <div style="position:absolute; inset:0; background:rgba(0,0,0,0.35)"></div>
      <div style="position:absolute; inset:0; display:grid; place-items:center; padding:16px;">
        <div class="card" style="max-width:380px; width:100%; padding:18px; box-shadow: var(--shadow-lg);">
          <h3 style="margin:0 0 8px;">Delete note?</h3>
          <p style="margin:0 0 16px; color:#6b7280;">
            Are you sure you want to delete "<strong>{{ title || 'Untitled' }}</strong>"? This action cannot be undone.
          </p>
          <div style="display:flex; gap:8px; justify-content:flex-end;">
            <button class="btn ghost" @click="$emit('close')">Cancel</button>
            <button class="btn danger" @click="$emit('confirm')">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
