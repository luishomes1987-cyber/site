import { NextResponse } from "next/server"
import { updateProduct, deleteProduct } from "@/lib/server-storage"
import type { Product } from "@/types" // Declare the Product variable

// Import the products array from the parent route
let products: Product[] = []

// Helper to sync with parent route storage
async function getProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`, {
    cache: "no-store",
  })
  products = await response.json()
  return products
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedProduct = updateProduct(id, body)

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const deleted = deleteProduct(id)

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
