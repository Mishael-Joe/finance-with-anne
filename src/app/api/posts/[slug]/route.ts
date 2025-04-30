import { type NextRequest, NextResponse } from "next/server";
import { getPostModel } from "@/lib/db/models/Post";
import { connectToDatabase } from "@/lib/db/mongoose";
import { revalidatePath } from "next/cache";

/**
 * GET handler for fetching a specific blog post by slug
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

    // Get the Post model
    const Post = await getPostModel();

    // Find the post by slug
    const post = await Post.findOne({ slug }).lean();

    // If post not found, return 404
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Return the post
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for updating a blog post
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the slug from params
    const { slug } = await params;

    // Parse request body
    const body = await request.json();

    // Get the Post model
    const Post = await getPostModel();

    // Find and update the post
    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    );

    // If post not found, return 404
    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Revalidate the blog pages to update the cache
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    if (body.slug && body.slug !== slug) {
      revalidatePath(`/blog/${body.slug}`);
    }

    // Return the updated post
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for deleting a blog post
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the slug from params
    const { slug } = await params;

    // Get the Post model
    const Post = await getPostModel();

    // Find and delete the post
    const deletedPost = await Post.findOneAndDelete({ slug });

    // If post not found, return 404
    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Revalidate the blog pages to update the cache
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    // Return success message
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
