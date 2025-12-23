import fs from "fs"
import path from "path"
import type { Product, Order } from "./server-storage"

const DATA_DIR = path.join(process.cwd(), "data")
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json")
const ORDERS_FILE = path.join(DATA_DIR, "orders.json")

// Ensure data directory exists
function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    console.log("[v0] Data directory created at:", DATA_DIR)
  }
}

// Default products data
function getDefaultProducts(): Product[] {
  return [
    {
      id: "5",
      name: "AirPods Pro",
      brand: "Apple",
      description: "Cancelamento ativo de ruído, modo de transparência e áudio espacial",
      price: 249.99,
      image: "/apple-airpods-pro-white.jpg",
      category: "Airpods",
      inStock: true,
    },
    {
      id: "6",
      name: "Vape Descartável Triple Flavor",
      brand: "Premium",
      description: "3 sabores distintos num único dispositivo premium",
      price: 12.99,
      image: "/colorful-disposable-vape-pen.jpg",
      category: "Vapes",
      flavors: 3,
      inStock: true,
    },
    {
      id: "7",
      name: "AirPods Max",
      brand: "Apple",
      description: "Auscultadores premium com cancelamento de ruído e áudio de alta fidelidade",
      price: 549.99,
      image: "/apple-airpods-max-silver-headphones.jpg",
      category: "Airpods",
      inStock: true,
    },
    {
      id: "8",
      name: "Vape Premium Six Flavor",
      brand: "Premium",
      description: "Dispositivo premium com 6 sabores diferentes para máxima variedade",
      price: 34.99,
      image: "/modern-premium-vape-device.jpg",
      category: "Vapes",
      flavors: 6,
      inStock: true,
    },
  ]
}

// Load products from file
export function loadProducts(): Product[] {
  ensureDataDirectory()
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, "utf-8")
      const products = JSON.parse(data)
      console.log("[v0] Loaded", products.length, "products from file")
      return products
    }
  } catch (error) {
    console.error("[v0] Error loading products from file:", error)
  }

  // If file doesn't exist or error, return and save default products
  const defaultProducts = getDefaultProducts()
  saveProducts(defaultProducts)
  return defaultProducts
}

// Save products to file
export function saveProducts(products: Product[]): void {
  ensureDataDirectory()
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8")
    console.log("[v0] Saved", products.length, "products to file")
  } catch (error) {
    console.error("[v0] Error saving products to file:", error)
  }
}

// Load orders from file
export function loadOrders(): Order[] {
  ensureDataDirectory()
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, "utf-8")
      const orders = JSON.parse(data)
      console.log("[v0] Loaded", orders.length, "orders from file")
      return orders
    }
  } catch (error) {
    console.error("[v0] Error loading orders from file:", error)
  }

  // Return empty array if file doesn't exist
  return []
}

// Save orders to file
export function saveOrders(orders: Order[]): void {
  ensureDataDirectory()
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8")
    console.log("[v0] Saved", orders.length, "orders to file")
  } catch (error) {
    console.error("[v0] Error saving orders to file:", error)
  }
}
