import BlogCard from "@/components/blog/blog-card";
import type { Post } from "@/lib/posts";

/**
 * Blog list component to display a grid of blog posts
 *
 * Features:
 * - Responsive grid layout
 * - Optional limit parameter to control number of posts displayed
 * - Uses BlogCard component for each post
 *
 * @param posts - Array of posts to display
 * @param limit - Optional number of posts to display
 */
function BlogList({ posts, limit }: { posts: Post[]; limit?: number }) {
  // Apply limit if provided
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayPosts.length > 0 ? (
        displayPosts.map((post) => <BlogCard key={post.slug} post={post} />)
      ) : (
        <div className="col-span-full text-center py-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">No posts found.</p>
        </div>
      )}
    </div>
  );
}

// Attach the BlogCard component to BlogList for convenience
BlogList.Card = BlogCard;

export default BlogList;
