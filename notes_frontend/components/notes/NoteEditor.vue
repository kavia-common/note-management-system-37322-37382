<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'

type Note = {
  id?: string
  title: string
  content: string
}

const props = defineProps<{ modelValue: Note }>()
const emit = defineEmits(['update:modelValue', 'save'])

const local = ref<Note>({ ...props.modelValue })

watch(() => props.modelValue, (v) => {
  local.value = { ...v }
}, { deep: true })

function update<K extends keyof Note>(key: K, val: Note[K]) {
  const next = { ...local.value, [key]: val }
  local.value = next
  emit('update:modelValue', next)
}

function onSave() {
  emit('save', local.value)
}
</script>

<template>
  <div class="card" style="padding:16px; display:grid; gap:12px;">
    <input
      class="input"
      placeholder="Title"
      :value="local.title"
      @input="update('title', ($event.target as HTMLInputElement).value)"
    />
    <textarea
      class="textarea"
      placeholder="Write your note..."
      :value="local.content"
      @input="update('content', ($event.target as HTMLTextAreaElement).value)"
    />
    <div style="display:flex; gap:8px; justify-content:flex-end;">
      <slot name="actions-before" />
      <button class="btn" @click="onSave">Save</button>
    </div>
  </div>
</template>
