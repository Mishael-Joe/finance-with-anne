import { getPosts } from "@/lib/posts"
import BlogCard from "@/components/blog/blog-card"

/**
 * Blog list component to display a grid of blog posts
 *
 * Features:
 * - Responsive grid layout
 * - Optional limit parameter to control number of posts displayed
 * - Uses BlogCard component for each post
 *
 * @param limit - Optional number of posts to display
 */
export default function BlogList({ limit }: { limit?: number }) {
  // Get all posts from the data source
  const allPosts = getPosts()

  // Apply limit if provided
  const posts = limit ? allPosts.slice(0, limit) : allPosts

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
