import type { Product, Category } from '../types'

const BASE_URL = 'https://fakestoreapi.com'

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}

export const getProductsByCategory = async (category: Category): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products/category/${category}`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}
