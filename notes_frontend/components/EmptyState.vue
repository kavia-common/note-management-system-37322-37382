<script setup lang="ts">
defineProps<{ title?: string; description?: string }>()
</script>

<template>
  <div class="empty">
    <h3>{{ title || 'Nothing here yet' }}</h3>
    <p>{{ description || 'Create or select an item to get started.' }}</p>
    <slot />
  </div>
</template>
