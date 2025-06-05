import Image from "next/image";
import Link from "next/link";
// import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/posts";

const getCategoryBadgeStyle = (category: string) => {
  switch (category) {
    case "Money Mindset":
      return "bg-green-600 hover:bg-green-500";
    case "Earning More":
      return "bg-blue-600 hover:bg-blue-500";
    case "Saving & Budgeting":
      return "bg-yellow-500 hover:bg-yellow-400 text-black";
    case "Local Investing":
      return "bg-rose-600 hover:bg-rose-500";
    case "Global Investing":
      return "bg-indigo-600 hover:bg-indigo-500";
    case "Financial Tools":
      return "bg-purple-600 hover:bg-purple-500";
    case "Life Goals":
      return "bg-pink-600 hover:bg-pink-500";
    case "Success Stories":
      return "bg-orange-600 hover:bg-orange-500";
    default:
      return "bg-primary hover:bg-primary-light";
  }
};

/**
 * Blog card component to display a blog post preview
 *
 * Features:
 * - Cover image
 * - Category badge
 * - Title with link to full post
 * - Excerpt
 * - Date and author info
 *
 * @param post - The blog post data to display
 */
export default function BlogCard({ post }: { post: Post }) {
  // Format category for display in URL
  const categorySlug = post.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden border border-border h-full flex flex-col">
      {/* Featured image */}
      <div className="aspect-video relative bg-muted">
        <Image
          src={post.featuredImage || "/placeholder.svg?height=300&width=500"}
          alt={post.title}
          fill
          className="object-cover"
        />
        {/* Category badge */}
        <Link
          href={`/blog/category/${categorySlug}`}
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white transition-colors ${getCategoryBadgeStyle(
            post.category
          )}`}
        >
          {post.category}
        </Link>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>

        {/* Meta information */}
        {/* <div className="flex items-center text-sm text-muted-foreground">
          <div className="mr-3">
            <Image
              src={
                post.author === "Mishael Joseph"
                  ? "/testimonials/mishael.jpg?height=40&width=40"
                  : "/anne.jpg?height=40&width=40"
              }
              alt="Anne"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-medium">{post.author || "Anne Johnson"}</p>
            <p>{formatDate(post.createdAt)}</p>
          </div>
        </div> */}
      </div>
    </article>
  );
}
