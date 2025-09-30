import { type NextRequest, NextResponse } from "next/server";
import { getProductModel } from "@/lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongoose";
import { revalidatePath } from "next/cache";
import { getAdminFromCookie } from "@/lib/helpers/get-admin-from-cookies";

/**
 * GET handler for fetching a specific product by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the slug from params
    const { slug } = await params;

    // Get the Product model
    const Product = await getProductModel();

    // Find the product by slug
    const product = await Product.findOne({ slug }).lean();

    // If product not found, return 404
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return the product
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for updating a product
 * Protected route - only authenticated admin users can update products
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const session = await getAdminFromCookie();

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Get the slug from params
    const { slug } = await params;

    // Parse request body
    const body = await request.json();

    // Get the Product model
    const Product = await getProductModel();

    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    );

    // If product not found, return 404
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Revalidate the products pages to update the cache
    revalidatePath("/products");
    revalidatePath(`/products/${slug}`);
    if (body.slug && body.slug !== slug) {
      revalidatePath(`/products/${body.slug}`);
    }

    // Return the updated product
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for deleting a product
 * Protected route - only authenticated admin users can delete products
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const session = await getAdminFromCookie();

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Get the slug from params
    const { slug } = await params;

    // Get the Product model
    const Product = await getProductModel();

    // Find and delete the product
    const deletedProduct = await Product.findOneAndDelete({ slug });

    // If product not found, return 404
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Revalidate the products pages to update the cache
    revalidatePath("/products");
    revalidatePath(`/products/${slug}`);

    // Return success message
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
