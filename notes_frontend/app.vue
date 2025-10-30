<script setup lang="ts">
/**
 * Root app shell: wraps pages with Toast container.
 */
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toast />
  </div>
</template>
