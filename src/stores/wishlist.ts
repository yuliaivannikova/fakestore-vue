import { defineStore } from 'pinia'
import type { Product } from '../types'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as Product[],
  }),

  getters: {
    count: (state) => state.items.length,
    isInWishlist: (state) => (id: number) => state.items.some((i) => i.id === id),
  },

  actions: {
    toggle(product: Product) {
      const index = this.items.findIndex((i) => i.id === product.id)
      if (index >= 0) {
        this.items.splice(index, 1)
      } else {
        this.items.push(product)
      }
    },
  },
})
