<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductsByCategory } from '../api/fakestore'
import type { Product } from '../types/index'

const route = useRoute()
const products = ref<Product[]>([])

onMounted(async () => {
  products.value = await getProductsByCategory(route.params.category as string)
})
</script>

<template>
  <div class="container">
    <h1>{{ route.params.category }}</h1>
    <div class="products">
      <!-- <div v-for="product in products" :key="product.id" class="product">
        <h2>{{ product.title }}</h2>
      </div> -->
    </div>
  </div>
</template>
