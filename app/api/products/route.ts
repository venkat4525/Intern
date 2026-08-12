import { NextResponse } from "next/server";
import { products, getProductsByCategory, searchProducts } from "@/data/products";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    let result = products;

    if (category) {
      result = getProductsByCategory(category);
    }

    if (query) {
      result = searchProducts(query);
    }

    return NextResponse.json({ success: true, count: result.length, products: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
