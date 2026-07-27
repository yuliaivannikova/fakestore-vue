<script setup lang="ts">
import { getCategories } from '../api/fakestore'
import { ref, onMounted } from 'vue'
import type { Category } from '../types/index'

const categories = ref<Category[]>([])

onMounted(async () => {
  categories.value = await getCategories()
})

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '-')
}
</script>

<template>
  <header class="app-header">
    <RouterLink to="/"><h1>FakeStore</h1></RouterLink>
    <nav aria-label="Categories">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink
        v-for="category in categories"
        :key="category"
        :to="`/category/${slugify(category)}`"
        :class="{ active: $route.params.category === slugify(category) }"
        >{{ category }}</RouterLink
      >
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: capitalize;
  text-decoration: none;
  color: var(--color-text);
  transition: color 0.3s ease;
}

header h1:hover {
  color: var(--color-primary);
}

.app-header {
  background-color: var(--color-bg);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.app-header nav {
  display: flex;
  gap: 1rem;
}

.app-header nav a {
  text-decoration: none;
  color: var(--color-text);
  text-transform: capitalize;
  transition: color 0.3s ease;
}

.app-header nav a:hover {
  color: var(--color-primary);
}

.app-header nav a.active {
  color: var(--color-primary);
}
</style>
