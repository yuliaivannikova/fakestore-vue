import { defineStore } from 'pinia'
import type { LoginCredentials } from '../types'
import { login } from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials: LoginCredentials) {
      const response = await login(credentials)
      this.token = response.token as string
      localStorage.setItem('token', response.token)
    },
    async logout() {
      this.token = null
      localStorage.removeItem('token')
    },
    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = localStorage.getItem('token')
      } 
    },
  },
})
