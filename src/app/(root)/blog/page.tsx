import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import CategorySection from "@/components/blog/category-section";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Real Money Talk | Finance with Anne",
  description:
    "Read the latest articles on personal finance, budgeting, saving, and investing strategies.",
};

export default async function BlogPage() {
  // Fetch posts grouped by category
  const postsByCategory = await getPostsByCategory();

  // Get all category names
  const categories = Object.keys(postsByCategory);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Blog Header */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Real Money Talk
        </h1>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            Practical advice and insights to help you master your finances and
            build wealth.
          </p>
        </div>
      </section>

      {/* Featured Categories */}
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            posts={postsByCategory[category]}
            limit={3}
          />
        ))
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground">
            No blog posts found. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
