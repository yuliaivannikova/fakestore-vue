<script setup lang="ts">
import { getCategories } from '../api/fakestore'
import { ref, onMounted, computed, inject, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { Category } from '../types/index'
import IconHeart from './IconHeart.vue'
import IconCart from './IconCart.vue'
import IconMenuMobile from './IconMenuMobile.vue'
import IconToggleTheme from './IconToggleTheme.vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useTheme } from '../composables/useTheme'
import { useAuthStore } from '../stores/auth'
const categories = ref<Category[]>([])
const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const isHomePage = computed(() => route.name === 'home')
const isMenuOpen = ref(false)
const authStore = useAuthStore()
onMounted(async () => {
  categories.value = await getCategories()
})
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="logo">
      <component class="logo-text" :is="isHomePage ? 'h1' : 'span'"> FakeStore </component>
    </RouterLink>
    <nav id="desktop-nav" aria-label="Categories">
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
      <RouterLink v-if="!authStore.isAuthenticated" to="/login">
        <button type="button">Log in</button>
      </RouterLink>
      <button v-else type="button" @click="authStore.logout(); router.push('/login')">Log out</button>
      <button type="button" aria-label="Add to wishlist" class="icon-btn wishlist-btn">
        <span v-if="wishlistStore.count > 0">{{ wishlistStore.count }}</span>
        <IconHeart />
      </button>
      <button type="button" aria-label="Add to cart" class="icon-btn cart-btn">
        <span v-if="cartStore.count > 0">{{ cartStore.count }}</span>
        <IconCart />
      </button>
      <button
        type="button"
        aria-label="Toggle theme"
        class="icon-btn theme-btn"
        @click="useTheme().toggleTheme"
      >
        <IconToggleTheme />
      </button>
      <button
        type="button"
        aria-label="Open menu"
        class="icon-btn mobile-nav burger"
        @click="isMenuOpen = !isMenuOpen"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-nav"
      >
        <IconMenuMobile />
      </button>
      <nav id="mobile-nav" :aria-expanded="isMenuOpen" aria-label="Mobile navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink
          v-for="category in categories"
          :key="category"
          :to="`/category/${encodeURIComponent(category)}`"
          :class="{ active: $route.params.category === category }"
          >{{ category }}</RouterLink
        >
      </nav>
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
  position: relative;

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

  #desktop-nav {
    display: none;
    @media (min-width: 768px) {
      display: flex;
    }
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

  .mobile-nav {
    @media (min-width: 768px) {
      .burger {
        display: none;
      }
    }
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
  }
  #mobile-nav {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: var(--color-bg);
      padding: 1rem;
      border-bottom: 1px solid var(--color-border);
      z-index: 100;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    &[aria-expanded='true'] {
      transform: translateX(0);
    }
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
  .burger {
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
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
.cart-btn,
.theme-btn,
.burger {
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
