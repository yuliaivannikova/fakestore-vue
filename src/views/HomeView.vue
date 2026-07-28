<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProductsByCategory, getProducts } from '../api/fakestore'
import AppProductCard from '../components/AppProductCard.vue'
import type { Product, Category } from '../types/index'

const route = useRoute()
const products = ref<Product[]>([])

async function loadProducts() {
  const category = route.params.category as string | undefined
  if (category) {
    products.value = await getProductsByCategory(category as Category)
  } else {
    products.value = await getProducts()
  }
}

onMounted(loadProducts)
watch(
  () => route.params.category,
  () => loadProducts(),
)
</script>

<template>
  <div class="container">
    <h2 class="category-title">
      <template v-if="route.params.category">
        {{ route.params.category as string }}
      </template>
      <template v-else>
        All Products
      </template>
    </h2>
    <div v-if="products.length > 0">
      <div class="products">
        <AppProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
    <div v-else>
      <p>No products found</p>
    </div>
  </div>
</template>

<style scoped>
.category-title {
  font-size: 1.5rem;
  font-weight: var(--weight-bold);
  color: var(--color-text);
  margin: var(--space-md) 0;
  text-align: center;
  text-transform: capitalize;
}
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
