<script setup lang="ts">
import TopNav from '~/components/TopNav.vue'
import Sidebar from '~/components/Sidebar.vue'
</script>

<template>
  <div class="app">
    <TopNav />
    <div class="layout">
      <aside class="sidebar">
        <Sidebar />
      </aside>
      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>
