import { defineStore } from 'pinia'
import type { Product } from '../types'
import { useAuthStore } from './auth'
import router from '@/router'
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { product: Product; quantity: number }[],
  }),

  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
  },

  actions: {
    add(product: Product) {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) {
        router.push({
          name: 'login',
          query: { redirect: router.currentRoute.value.fullPath },
        })
        return
      }
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },
  },
})