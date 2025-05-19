import { type NextRequest, NextResponse } from "next/server";
import { getPostModel } from "@/lib/db/models/Post";
import { connectToDatabase } from "@/lib/db/mongoose";
import { revalidatePath } from "next/cache";

/**
 * GET handler for fetching all blog posts
 * Supports filtering by published status, category, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get("published");
    const category = searchParams.get("category");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    // if (published !== null) {
    //   query.published = published === "true";
    // }

    // Add category filter if provided
    if (category) {
      query.category = category;
    }

    // Get the Post model
    const Post = await getPostModel();

    // Fetch posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Count total posts for pagination
    const total = await Post.countDocuments(query);

    // Return posts with pagination metadata
    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new blog post
 */
export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { error: "Title, content, and category are required" },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
    }

    // Generate excerpt from content if not provided
    if (!body.excerpt) {
      // Strip HTML tags and get first 160 characters
      const plainText = body.content.replace(/<[^>]+>/g, "");
      body.excerpt =
        plainText.substring(0, 160) + (plainText.length > 160 ? "..." : "");
    }

    // Get the Post model
    const Post = await getPostModel();

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug: body.slug });
    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    // Create new post
    const post = new Post(body);
    await post.save();

    // Revalidate the blog pages to update the cache
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    // Return the created post
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
