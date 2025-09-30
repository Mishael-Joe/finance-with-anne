import { type NextRequest, NextResponse } from "next/server";
import { getProductModel } from "@/lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongoose";
import { revalidatePath } from "next/cache";
import { getAdminFromCookie } from "@/lib/helpers/get-admin-from-cookies";
/**
 * GET handler for fetching all products
 * Supports filtering by category, visibility, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const visibleOnly = searchParams.get("visibleOnly") === "true";
    const limit = Number.parseInt(searchParams.get("limit") || "50");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build query options
    const queryOptions: any = {
      limit,
      skip,
    };

    if (category) {
      queryOptions.category = category;
    }

    if (visibleOnly !== null) {
      queryOptions.visibleOnly = visibleOnly;
    }

    // Get the Product model
    const Product = await getProductModel();

    // Fetch products with options
    const products = await Product.find(
      queryOptions.visibleOnly ? { isVisible: true } : {}
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Count total products for pagination
    const total = await Product.countDocuments(
      queryOptions.visibleOnly ? { isVisible: true } : {}
    );

    // Return products with pagination metadata
    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new product
 * Protected route - only authenticated admin users can create products
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getAdminFromCookie();

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description || body.price === undefined) {
      return NextResponse.json(
        { error: "Title, description, and price are required" },
        { status: 400 }
      );
    }

    // Validate category-specific fields
    if (["e-book", "template"].includes(body.category) && !body.fileUrl) {
      return NextResponse.json(
        { error: "File URL is required for e-books and templates" },
        { status: 400 }
      );
    }

    // Get the Product model
    const Product = await getProductModel();

    // Create new product
    const product = new Product(body);
    await product.save();

    // Revalidate the products pages to update the cache
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);

    // Return the created product
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
