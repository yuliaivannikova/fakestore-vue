<script setup lang="ts">
import type { Product } from '../types/index'

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <RouterLink :to="`/product/${product.id}`" class="product-card">
    <img :src="product.image" :alt="product.title" />
    <h3 class="product-title">{{ product.title }}</h3>
    <p class="product-price">{{ product.price }}</p>
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

.product-title {
  text-align: center;
  color: var(--color-text);
  transition: color 0.3s ease;
}
.product-title:hover {
  color: var(--color-primary);
}

.product-price {
  text-align: center;
  color: var(--color-text);
}
</style>
