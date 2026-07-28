import { defineStore } from 'pinia'
import type { Product } from '../types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { product: Product; quantity: number }[],
  }),

  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
  },

  actions: {
    add(product: Product) {
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },
  },
})