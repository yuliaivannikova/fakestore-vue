<script setup lang="ts"></script>

<template>
  <header class="app-header">
    <h1>App Header</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--color-bg);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}
</style>