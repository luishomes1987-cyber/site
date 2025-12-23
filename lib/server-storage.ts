// Server-side storage para manter dados em memória compartilhados entre rotas
import { loadProducts, saveProducts, loadOrders, saveOrders } from "./file-storage"

export interface Product {
  id: string
  name: string
  brand: string
  description?: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  sizes?: string[]
  flavors?: number
  inStock: boolean
}

export interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    instagram: string
    address: string
    city: string
    postalCode: string
    notes?: string
  }
  items: Array<{
    id: string
    name: string
    brand: string
    price: number
    image: string
    size: string
    quantity: number
  }>
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  shippingCost?: number
}

const serverStorage = {
  products: loadProducts(),
  orders: loadOrders(),
}

// Product operations
export const getAllProducts = () => serverStorage.products

export const getProductById = (id: string) => serverStorage.products.find((p) => p.id === id)

export const createProduct = (product: Omit<Product, "id">) => {
  const newProduct: Product = {
    ...product,
    id: `PROD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
  }
  serverStorage.products.push(newProduct)
  saveProducts(serverStorage.products)
  console.log("[v0] Product created:", newProduct.id, newProduct.name)
  return newProduct
}

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const index = serverStorage.products.findIndex((p) => p.id === id)
  if (index === -1) return null

  serverStorage.products[index] = { ...serverStorage.products[index], ...updates }
  saveProducts(serverStorage.products)
  console.log("[v0] Product updated:", id, serverStorage.products[index].name)
  return serverStorage.products[index]
}

export const deleteProduct = (id: string) => {
  const index = serverStorage.products.findIndex((p) => p.id === id)
  if (index === -1) return false

  const deletedProduct = serverStorage.products.splice(index, 1)[0]
  saveProducts(serverStorage.products)
  console.log("[v0] Product deleted:", deletedProduct.id, deletedProduct.name)
  return true
}

// Order operations
export const getAllOrders = () => serverStorage.orders

export const getOrderById = (id: string) => serverStorage.orders.find((o) => o.id === id)

export const createOrder = (order: Omit<Order, "id" | "createdAt" | "status">) => {
  const newOrder: Order = {
    ...order,
    id: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  }
  serverStorage.orders.push(newOrder)
  saveOrders(serverStorage.orders)
  console.log("[v0] Order created:", newOrder.id, "Customer:", newOrder.customer.name)
  return newOrder
}

export const updateOrder = (id: string, updates: Partial<Order>) => {
  const index = serverStorage.orders.findIndex((o) => o.id === id)
  if (index === -1) return null

  serverStorage.orders[index] = { ...serverStorage.orders[index], ...updates }
  saveOrders(serverStorage.orders)
  console.log("[v0] Order updated:", id, serverStorage.orders[index].status)
  return serverStorage.orders[index]
}
