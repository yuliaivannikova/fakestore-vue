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
  <article v-if="product" class="product-view">
    <div class="product-image-container">
      <img :src="product?.image" :alt="product?.title" class="product-image" />
    </div>
    <div class="product-details">
      <h1 class="product-title">{{ product?.title }}</h1>
      <p class="product-description">{{ product?.description }}</p>
    </div>
    <div class="product-actions">
      <p class="product-price">${{ product?.price }}</p>
      <button type="button" @click="cartStore.add(product)" aria-label="Add to cart" class="icon-btn cart-btn">
        <IconCart />
      </button>
      <button type="button" aria-label="Add to wishlist" class="icon-btn wishlist-btn">
        <IconHeart />
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">

</style>