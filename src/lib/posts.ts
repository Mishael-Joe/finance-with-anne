import { getPostModel } from "./db/models/Post";
import { connectToDatabase } from "./db/mongoose";

/**
 * Types for blog posts
 */
export interface Post {
  slug: string;
  title: string;
  date: Date;
  category: string[];
  excerpt: string;
  coverImage?: string;
  content?: string;
  author?: string;
}

/**
 * Get all blog posts, sorted by date (newest first)
 */
export async function getPosts(): Promise<Post[]> {
  // Connect to the database
  await connectToDatabase();

  // Get the Post model
  const Post = await getPostModel();

  // Fetch all posts, sorted by creation date (newest first)
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.createdAt,
    category: post.tags,
    excerpt: post.excerpt,
    coverImage: post.featuredImage,
    content: post.content,
    author: post.author,
  }));
}
