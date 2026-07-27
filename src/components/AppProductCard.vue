<script setup lang="ts">
import type { Product } from '../types/index'

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <RouterLink :to="`/product/${product.id}`" class="product-card">
    <div class="product-image-container">
      <img :src="product.image" :alt="product.title" class="product-image" />
    </div>
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-price">{{ product.price }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  border-radius: 0.5rem;
  padding: 1rem;
  text-decoration: none;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image-container {
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background-color: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--space-md);
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.product-title {
 font-size: 0.95rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text);
  transition: color 0.3s ease;
}
.product-title:hover {
  color: var(--color-primary);
}

.product-price {
  font-size: 0.95rem;
  text-align: center;
  color: var(--color-text);
  font-weight: var(--weight-bold);
}
</style>
