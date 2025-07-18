import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BlogCard from "@/components/blog/blog-card";
import type { Post } from "@/lib/posts";

interface CategorySectionProps {
  category: string;
  posts: Post[];
  limit?: number;
}

const categoryDescriptions = (cat: string) => {
  switch (cat) {
    case "Money Mindset":
      return "Money Mindset: Think like a Milionaire.";
    case "Make More Money":
      return "Make More Money: Businesses and Skills that work.";
    case "Saving & Budgeting":
      return "Saving and Budgeting your Money the right way to achieve your Money goals.";
    case "Nigerian Investments":
      return "Nigerian Investments: Invest the right way in Nigeria.";
    case "Invest Globally":
      return "Invest Globally: Investment without borders.";
    case "Financial Tools":
      return "Financial Tools that help you achieve your Money Goals.";
    case "Life Goals":
      return "Financial planning and Management for Important Life Goals.";
    case "Success Stories":
      return "Success Stories to inspire you on your financial journey.";
    default:
      return "";
  }
};

/**
 * Displays a section of blog posts for a specific category
 */
export default function CategorySection({
  category,
  posts,
  limit = 3,
}: CategorySectionProps) {
  // Format category for display in URL
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-");

  // Limit the number of posts displayed
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-primary">
          {categoryDescriptions(category)}
        </h2>
        <Link
          href={`/blog/category/${categorySlug}`}
          className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
        >
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      {/* Category description */}
      {/* <p className="text-muted-foreground mb-6 max-w-4xl">
        {categoryDescriptions(category)}
      </p> */}

      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">
            No posts in this category yet. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
}
