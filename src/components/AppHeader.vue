<script setup lang="ts">
import { getCategories } from '../api/fakestore'
import { ref, onMounted } from 'vue'
import type { Category } from '../types/index'
import IconHeart from './IconHeart.vue'
import IconCart from './IconCart.vue'
import { useCartStore } from '@/stores/cart'

const categories = ref<Category[]>([])

const cartStore = useCartStore()

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
        <span v-if="cartStore.count > 0">{{ cartStore.count }}</span>
        <IconCart />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-bg);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
    color: var(--color-text);
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary);
    }
  }

  nav {
    display: flex;
    gap: 1rem;

    a {
      text-decoration: none;
      color: var(--color-text);
      text-transform: capitalize;
      transition: color 0.3s ease;

      &:hover,
      &.active {
        color: var(--color-primary);
      }
    }
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
  }
}

.logo {
  text-decoration: none;
  cursor: pointer;
}

.icon-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.wishlist-btn,
.cart-btn {
  color: var(--color-text);

  &:hover {
    color: var(--color-primary);
  }
}

.cart-btn {
  position: relative;
  padding-right: 1rem;

  span {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--color-primary);
    color: var(--color-white);
    border-radius: 50%;
    padding: 0.25rem 0.5rem;
    font-weight: var(--weight-bold);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
