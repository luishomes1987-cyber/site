import { NextResponse } from "next/server"
import { getAllProducts, createProduct, type Product } from "@/lib/server-storage"

export type { Product }

export async function GET() {
  const products = getAllProducts()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newProduct = createProduct(body)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
