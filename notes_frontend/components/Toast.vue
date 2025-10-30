<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'

type ToastItem = { id: number; type: 'success' | 'error' | 'info'; message: string; timeout?: number }

const items = ref<ToastItem[]>([])
let idSeq = 1

function push(msg: string, type: ToastItem['type'] = 'info', timeout = 2500) {
  const id = idSeq++
  items.value.push({ id, type, message: msg, timeout })
  if (timeout) {
    setTimeout(() => remove(id), timeout)
  }
}
function remove(id: number) {
  items.value = items.value.filter(i => i.id !== id)
}

// PUBLIC_INTERFACE
function useToast() {
  /** Provide API to push toasts from any component via inject('toast') */
  return { push, remove }
}

// provide globally so other components can inject('toast')
provide('toast', { push, remove })

onMounted(() => {
  // no-op
})
</script>

<template>
  <div class="toast">
    <div v-for="t in items" :key="t.id" class="toast-item" :class="t.type">
      <div v-if="t.type==='success'">✅</div>
      <div v-else-if="t.type==='error'">⛔</div>
      <div v-else>ℹ️</div>
      <div style="flex:1">{{ t.message }}</div>
      <button class="btn ghost" style="padding:4px 8px;" @click="remove(t.id)">✕</button>
    </div>
  </div>
</template>
