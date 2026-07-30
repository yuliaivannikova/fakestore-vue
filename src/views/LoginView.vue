<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)
const route = useRoute()

const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    await authStore.login({ username: username.value, password: password.value })
    router.push((route.query.redirect as string) || '/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred' as string
    console.error(error)
  }
}
</script>

<template>
  <div class="container login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input id="username" v-model="username" type="text" autocomplete="username" required />
      <input id="password" v-model="password" type="password" autocomplete="current-password" required />
      <button type="submit">Log in</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 70vh;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}


</style>
