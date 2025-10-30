<script setup lang="ts">
import { useRouter } from '#imports'
const router = useRouter()
const goNew = () => router.push('/notes/new')
</script>

<template>
  <header class="topnav">
    <div class="brand">
      <div class="brand-badge">✦</div>
      <div>
        <div style="font-size:14px; color:#6b7280;">Ocean Professional</div>
        <div>Nuxt Notes</div>
      </div>
    </div>
    <div style="display:flex; gap:8px; align-items:center;">
      <NuxtLink class="btn ghost" to="/notes">All Notes</NuxtLink>
      <button class="btn" @click="goNew">
        <span>＋</span>
        New Note
      </button>
    </div>
  </header>
</template>
