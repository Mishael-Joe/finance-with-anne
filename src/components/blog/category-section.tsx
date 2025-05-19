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
      return "Learn the principles that shape how you think, feel and act with money. This section covers financial literacy basics, building a wealthy mindset, overcoming limiting beliefs about money and cultivating habits that set the foundation for long-term success.";
    case "Earning More":
      return "Explore ways to increase your income and discover income opportunities. Here you'll find articles on career growth, high-paying jobs, side hustle ideas, freelance gigs and how to monetize your skills both online and offline.";
    case "Saving & Budgeting":
      return "Master how to save more money without feeling deprived. This category includes tips on building an emergency fund, saving on a low income, goal-based saving, choosing the right savings accounts and automation hacks. Tell your money where to go.";
    case "Local Investing":
      return "Start investing right where you are, with what you have even if you are outside Nigeria. This section teaches beginners and intermediate investors how to invest in Nigerian opportunities like real estate, agriculture, stocks, mutual funds, government bonds and more.";
    case "Global Investing":
      return "Grow your wealth globally and diversify your income. Learn how to invest in USA and international stocks, ETFs, real estate and other foreign opportunities using trusted platforms accessible from Nigeria and other parts of the world.";
    case "Financial Tools":
      return "Use the right tools to simplify and boost your financial journey. Here you’ll find reviews and guides on savings/investment apps, budgeting tools and financial platforms—helping you choose what works best for your goals.";
    case "Life Goals":
      return "Plan your finances around the life you want to live. This section focuses on financial planning for major life goals like education, weddings, parenting, travel, homeownership, retirement and more.";
    case "Success Stories":
      return "Real-life lessons and strategies that work. Read personal finance success stories, user experiences and case studies to learn practical, actionable strategies that others have used to build wealth.";
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
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">{category}</h2>
        <Link
          href={`/blog/category/${categorySlug}`}
          className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
        >
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      {/* Category description */}
      <p className="text-muted-foreground mb-6 max-w-4xl">
        {categoryDescriptions(category)}
      </p>

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
