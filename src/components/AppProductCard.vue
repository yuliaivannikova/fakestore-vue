<script setup lang="ts">
import type { Product } from '../types/index'
import IconCart from './IconCart.vue'
import IconHeart from './IconHeart.vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <article class="product-card">
    <div class="product-image-container">
      <img :src="product.image" :alt="product.title" class="product-image" />

      <button type="button" aria-label="Add to wishlist" :class="{ active: wishlistStore.isInWishlist(product.id) }"class="icon-btn wishlist-btn" @click="wishlistStore.toggle(product)">
        <IconHeart />
      </button>
    </div>

    <RouterLink :to="`/product/${product.id}`" class="product-link">
      <div class="product-info">
        <h3 class="product-title">{{ product.title }}</h3>
      </div>
    </RouterLink>

    <div class="product-actions">
      <p class="product-price">${{ product.price }}</p>
      <button @click="cartStore.add(product)" type="button" aria-label="Add to cart" class="icon-btn cart-btn">
        <IconCart />
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  border-radius: 0.5rem;
  padding: 1rem;
  text-decoration: none;
  box-shadow: var(--shadow);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image-container {
  position: relative;
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--space-md);
  overflow: hidden;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.wishlist-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  color: var(--color-text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    color 0.2s ease,
    background-color 0.2s ease;
}

.product-card:hover .wishlist-btn,
.wishlist-btn:focus-visible,
.wishlist-btn.active {
  opacity: 1;
  transform: scale(1);
}

.wishlist-btn:hover,
.wishlist-btn.active {
  color: var(--color-primary);
  background-color: var(--color-bg);
}

.product-link {
  text-decoration: none;
  color: inherit;
  flex-grow: 1;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.product-card:hover .product-title {
  color: var(--color-primary);
}

.product-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.product-price {
  font-size: 1.1rem;
  color: var(--color-text);
  font-weight: var(--weight-bold);
  margin: 0;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
}

.cart-btn {
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.cart-btn:hover {
  opacity: 0.9;
}

@media (hover: none) {
  .wishlist-btn {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
