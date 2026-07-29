<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { getProductById } from '../api/fakestore'
import IconCart from '../components/IconCart.vue'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import IconHeart from '../components/IconHeart.vue'
import { useFetch } from '../composables/useFetch'
import AppLoader from '../components/AppLoader.vue'

const route = useRoute()
const {
  data: product,
  isLoading,
  error,
  refetch,
} = useFetch(() => getProductById(Number(route.params.id)))
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
watch(() => route.params.id, refetch)

</script>

<template>
  <div class="container">
    <AppLoader v-if="isLoading" />
    <p class="error-message" v-else-if="error">{{ error }}</p>
    <article v-else-if="product" class="product-view">
      <div class="product-image-container">
        <img :src="product.image" :alt="product.title" class="product-image" />
      </div>
      <div class="product-details">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-description">{{ product?.description }}</p>
        <div class="product-actions">
          <p class="product-price">${{ product?.price }}</p>
          <button
            type="button"
            @click="cartStore.add(product)"
            aria-label="Add to cart"
            class="icon-btn cart-btn"
          >
            <IconCart />
          </button>
          <button type="button" :class="{ active: wishlistStore.isInWishlist(product.id) }" aria-label="Add to wishlist" class="icon-btn wishlist-btn" @click="wishlistStore.toggle(product)">
            <IconHeart />
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.product-view {
  margin-top: var(--space-xl);
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  grid-template-areas:
    'image'
    'details';

  @media (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
    grid-template-areas: 'image details';
  }
}

.product-details {
  grid-area: details;
}

.product-image-container {
  width: 100%;
  border-radius: var(--radius);
  background-color: var(--color-surface);
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: var(--space-lg);

  @media (min-width: 768px) {
    min-height: 600px;
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    grid-area: image;
  }
}
.product-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.product-title {
  font-size: 2rem;
  font-weight: 600;
}
.product-description {
  font-size: 1.2rem;
  font-weight: 400;
}
.product-price {
  font-size: 1.2rem;
  font-weight: 600;
}
.product-actions {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.icon-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.cart-btn,
.wishlist-btn {
  color: var(--color-text);
  transition: color 0.3s ease;
  &:hover, &:focus-visible, &.active {
    color: var(--color-primary);
  }
}
</style>
