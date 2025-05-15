import type { Metadata } from "next";
import BlogList from "@/components/blog/blog-list";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Real Money Talk | Finance with Anne",
  description:
    "Read the latest articles on personal finance, budgeting, saving, and investing strategies.",
};

export default function BlogPage() {
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

      {/* Blog Categories (optional) */}
      {/* <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">All Posts</button>
          <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            Budgeting
          </button>
          <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            Saving
          </button>
          <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            Investing
          </button>
          <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            Debt Management
          </button>
        </div>
      </section> */}

      {/* Blog List */}
      <section>
        <BlogList />
      </section>
    </div>
  );
}
