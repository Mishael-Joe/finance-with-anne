export interface Post {
  slug: string;
  title: string;
  createdAt: Date | string; // Changed from date to createdAt
  category: string;
  excerpt: string;
  featuredImage?: string; // Changed from coverImage to featuredImage
  content?: string;
  tags?: string[];
  author?: string;
  published?: boolean;
}

/**
 * Get posts grouped by category
 * @returns Object with categories as keys and arrays of posts as values
 */
export async function getPostsByCategory(): Promise<Record<string, Post[]>> {
  try {
    // Fetch posts from the API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/posts?published=true`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    const posts: Post[] = data.posts || [];

    // Group posts by category
    const postsByCategory: Record<string, Post[]> = {};

    posts.forEach((post: Post) => {
      if (!postsByCategory[post.category]) {
        postsByCategory[post.category] = [];
      }
      postsByCategory[post.category].push(post);
    });

    // console.log("Posts grouped by category:", postsByCategory);

    return postsByCategory;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return {};
  }
}

/**
 * Get all posts, sorted by date (newest first)
 */
export async function getPosts(): Promise<Post[]> {
  try {
    // Fetch posts from the API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/posts?published=true`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    const posts: Post[] = data.posts || [];

    // Sort posts by createdAt (newest first)
    return [...posts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 * @param slug - The unique identifier for the blog post
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    // Fetch post from the API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/posts/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return undefined;
  }
}

/**
 * Get posts by specific category
 * @param category - The category to filter by
 * @param limit - Optional limit on number of posts to return
 */
export async function getPostsBySpecificCategory(
  category: string,
  limit?: number
): Promise<Post[]> {
  try {
    // Fetch posts from the API
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || ""
      }/api/posts?published=true&category=${encodeURIComponent(category)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts for category: ${category}`);
    }

    const data = await response.json();
    let posts: Post[] = data.posts || [];

    // Sort posts by createdAt (newest first)
    posts = posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply limit if specified
    if (limit && posts.length > limit) {
      posts = posts.slice(0, limit);
    }

    return posts;
  } catch (error) {
    console.error(`Error fetching posts for category ${category}:`, error);
    return [];
  }
}
