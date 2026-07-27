<script setup lang="ts">
import { getCategories } from '../api/fakestore'
import { ref, onMounted } from 'vue'
import type { Category } from '../types/index'
import IconHeart from './IconHeart.vue'
import IconCart from './IconCart.vue'
const categories = ref<Category[]>([])

onMounted(async () => {
  categories.value = await getCategories()
})
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="logo"><h1>FakeStore</h1></RouterLink>
    <nav aria-label="Categories">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink
        v-for="category in categories"
        :key="category"
        :to="`/category/${encodeURIComponent(category)}`"
        :class="{ active: $route.params.category === category }"
        >{{ category }}</RouterLink
      >
    </nav>
    <div class="header-actions">
      <button type="button" aria-label="Add to wishlist" class="icon-btn wishlist-btn">
        <IconHeart />
      </button>
      <button type="button" aria-label="Add to cart" class="icon-btn cart-btn">
        <IconCart />
      </button>
    </div>
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
  color: var(--color-text);
  transition: color 0.3s ease;
}

header h1:hover {
  color: var(--color-primary);
}

.logo {
  text-decoration: none;
  cursor: pointer;
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
.header-actions {
  display: flex;
  gap: 0.5rem;
}
.icon-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}
.wishlist-btn {
  color: var(--color-text);
}
.cart-btn {
  color: var(--color-text);
}
.wishlist-btn:hover {
  color: var(--color-primary);
}
.cart-btn:hover {
  color: var(--color-primary);
}
</style>
