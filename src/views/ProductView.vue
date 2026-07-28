<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getProductById } from '../api/fakestore'
import type { Product } from '../types/index'
import IconCart from '../components/IconCart.vue'
import { useCartStore } from '../stores/cart'
import IconHeart from '../components/IconHeart.vue'
const route = useRoute()
const product = ref<Product | null>(null)

const cartStore = useCartStore()

onMounted(async () => {
  product.value = await getProductById(Number(route.params.id as string))
})
</script>

<template>
  <div class="container">
    <article v-if="product" class="product-view">
      <div class="product-image-container">
        <img :src="product?.image" :alt="product?.title" class="product-image" />
      </div>
      <div class="product-details">
        <h1 class="product-title">{{ product?.title }}</h1>
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
          <button type="button" aria-label="Add to wishlist" class="icon-btn wishlist-btn">
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

.product-actions {
  grid-area: actions;
}
.product-image-container {
  width: 100%;
  border-radius: var(--radius);
  background-color: var(--color-surface);
  height: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: var(--space-lg);
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
.cart-btn, .wishlist-btn {
  color: var(--color-text);
  transition: color 0.3s ease;
  &:hover {
    color: var(--color-primary);
  }
}

</style>
