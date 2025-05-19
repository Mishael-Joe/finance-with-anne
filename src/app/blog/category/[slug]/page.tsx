import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPostsBySpecificCategory } from "@/lib/posts";
import BlogList from "@/components/blog/blog-list";

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Convert slug to category name
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${decodeURIComponent(categoryName)} | Finance with Anne Blog`,
    description: `Read our latest articles about ${decodeURIComponent(
      categoryName.toLowerCase()
    )} to improve your financial knowledge and skills.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Convert slug to category name
  const { slug } = await params;
  // console.log("categorySlug:", slug);

  const categoryName = decodeURIComponent(slug)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // console.log("categoryName:", categoryName);

  // Map slug to actual category name from enum
  const categoryMap: Record<string, string> = {
    "money-mindset": "Money Mindset",
    "earning-more": "Earning More",
    "saving-budgeting": "Saving & Budgeting",
    "local-investing": "Local Investing",
    "global-investing": "Global Investing",
    "financial-tools": "Financial Tools",
    "life-goals": "Life Goals",
    "success-stories": "Success Stories",
  };

  const actualCategory = categoryMap[slug] || categoryName;

  // console.log("actualCategory:", actualCategory);

  // Fetch posts for this category
  const posts = await getPostsBySpecificCategory(actualCategory);

  // If no posts found and category is not valid, return 404
  if (
    posts.length === 0 &&
    !Object.values(categoryMap).includes(actualCategory)
  ) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Back to blog link */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-secondary hover:text-secondary-light font-medium flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Categories
        </Link>
      </div>

      {/* Category Header */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {actualCategory}
        </h1>
        <div className="max-w-3xl">
          <p className="text-lg text-muted-foreground">
            Browse our latest articles about {actualCategory.toLowerCase()} to
            improve your financial knowledge and skills.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogList.Card key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              No posts in this category yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
