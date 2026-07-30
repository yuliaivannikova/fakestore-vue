export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

export type Category = string

export type LoginCredentials = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
}