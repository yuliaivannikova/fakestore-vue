<script setup lang="ts">
import { getCategories } from '../api/fakestore'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Category } from '../types/index'
import IconHeart from './IconHeart.vue'
import IconCart from './IconCart.vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const categories = ref<Category[]>([])
const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const isHomePage = computed(() => route.name === 'home')
onMounted(async () => {
  categories.value = await getCategories()
})
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="logo">
      <component class="logo-text" :is="isHomePage ? 'h1' : 'span'"> FakeStore </component>
    </RouterLink>
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
        <span v-if="wishlistStore.count > 0">{{ wishlistStore.count }}</span>
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

  .logo-text {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
    color: var(--color-text);
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary);
    }
  }
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

.cart-btn,
.wishlist-btn {
  position: relative;

  span {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.7rem;
    background-color: var(--color-primary);
    color: var(--color-white);
    border-radius: 50%;
    padding: 0.25rem 0.5rem;
    font-weight: var(--weight-bold);
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-btn {
    padding-right: 1rem;
    span {
      right: 0.25rem;
    }
  }
}
</style>
