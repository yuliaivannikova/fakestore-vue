import type { LoginCredentials, LoginResponse } from '../types'

const BASE_URL = 'https://fakestoreapi.com'

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid login or password')
    } 
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}
