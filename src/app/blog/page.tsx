import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import CategorySection from "@/components/blog/category-section";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Blog | Finance with Anne",
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

// import type { Metadata } from "next";
// import BlogList from "@/components/blog/blog-list";

// // SEO metadata for the blog page
// export const metadata: Metadata = {
//   title: "Real Money Talk | Finance with Anne",
//   description:
//     "Read the latest articles on personal finance, budgeting, saving, and investing strategies.",
// };

// /**
//  * BlogPage renders multiple blog sections categorized by topics.
//  * Each section displays blog posts from a specific category.
//  */
// export default function BlogPage() {
//   return (
//     <div className="container mx-auto px-4 md:px-6 py-12 space-y-16">
//       {/* Blog Header */}
//       <section className="mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
//           Real Money Talk
//         </h1>
//         <div className="max-w-3xl mx-auto text-center">
//           <p className="text-lg text-muted-foreground">
//             Practical advice and insights to help you master your finances and
//             build wealth.
//           </p>
//         </div>
//       </section>

//       {/* Blog Categories (optional) */}
//       {/* <section className="mb-12">
//         <div className="flex flex-wrap justify-center gap-3">
//           <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
//             All Posts
//           </button>
//           <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
//             Budgeting
//           </button>
//           <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
//             Saving
//           </button>
//           <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
//             Investing
//           </button>
//           <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
//             Debt Management
//           </button>
//         </div>
//       </section> */}

//       {/* Blog List */}
//       <BlogSection
//         // title="Money Mindset & Financial Foundations"
//         title="Money Mindset"
//         description="Learn the principles that shape how you think, feel and act with money. This section covers financial literacy basics, building a wealthy mindset, overcoming limiting beliefs about money and cultivating habits that set the foundation for long-term success."
//         category="Money Mindset"
//       />

//       <BlogSection
//         // title="Earning More: Jobs, Careers & Side Hustles"
//         title="Earning More"
//         description="Explore ways to increase your income and discover income opportunities. Here you'll find articles on career growth, high-paying jobs, side hustle ideas, freelance gigs and how to monetize your skills both online and offline."
//         category="Earning More"
//       />

//       <BlogSection
//         // title="Smart Saving & Budgeting Strategies"
//         title="Saving & Budgeting"
//         description="Master how to save more money without feeling deprived. This category includes tips on building an emergency fund, saving on a low income, goal-based saving, choosing the right savings accounts and automation hacks. Tell your money where to go."
//         category="Saving & Budgeting"
//       />

//       <BlogSection
//         // title="Investing in Nigeria"
//         title="Local Investing"
//         description="Start investing right where you are, with what you have even if you are outside Nigeria. This section teaches beginners and intermediate investors how to invest in Nigerian opportunities like real estate, agriculture, stocks, mutual funds, government bonds and more."
//         category="Local Investing"
//       />

//       <BlogSection
//         // title="Investing Internationally"
//         title="Global Investing"
//         description="Grow your wealth globally and diversify your income. Learn how to invest in USA and international stocks, ETFs, real estate and other foreign opportunities using trusted platforms accessible from Nigeria and other parts of the world."
//         category="Global Investing"
//       />

//       <BlogSection
//         // title="Financial Tools, Apps & Reviews"
//         title="Financial Tools"
//         description="Use the right tools to simplify and boost your financial journey. Here you’ll find reviews and guides on savings/investment apps, budgeting tools and financial platforms—helping you choose what works best for your goals."
//         category="Financial Tools"
//       />

//       <BlogSection
//         // title="Money for Life Goals"
//         title="Life Goals"
//         description="Plan your finances around the life you want to live. This section focuses on financial planning for major life goals like education, weddings, parenting, travel, homeownership, retirement and more."
//         category="Life Goals"
//       />

//       <BlogSection
//         // title="Success Stories & Case Studies"
//         title="Success Stories"
//         description="Real-life lessons and strategies that work. Read personal finance success stories, user experiences and case studies to learn practical, actionable strategies that others have used to build wealth."
//         category="Success Stories"
//       />
//     </div>
//   );
// }

// /**
//  * BlogSection renders a title, description and filtered list of blog posts by category.
//  * @param title - Section heading
//  * @param description - Brief explanation of the category's focus
//  * @param category - Category used to filter blog posts
//  */
// function BlogSection({
//   title,
//   description,
//   category,
// }: {
//   title: string;
//   description: string;
//   category: string;
// }) {
//   return (
//     <section>
//       <h2 className="text-3xl font-semibold mb-4">{title}</h2>
//       <p className="text-muted-foreground mb-6 max-w-4xl">{description}</p>
//       <BlogList category={category} />
//     </section>
//   );
// }

// import type { Metadata } from "next";
// import BlogList from "@/components/blog/blog-list";

// // Define metadata for SEO
// export const metadata: Metadata = {
//   title: "Real Money Talk | Finance with Anne",
//   description:
//     "Read the latest articles on personal finance, budgeting, saving, and investing strategies.",
// };

// export default function BlogPage() {
//   return (
//     <div className="container mx-auto px-4 md:px-6 py-12">
//       {/* Blog Header */}
//       <section className="mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
//           Real Money Talk
//         </h1>
//         <div className="max-w-3xl mx-auto text-center">
//           <p className="text-lg text-muted-foreground">
//             Practical advice and insights to help you master your finances and
//             build wealth.
//           </p>
//         </div>
//       </section>

//       {/* Blog Categories (optional) */}
//       <section className="mb-12">
//         <div className="flex flex-wrap justify-center gap-3">
//           <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
//             All Posts
//           </button>
//           <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
//             Budgeting
//           </button>
//           <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
//             Saving
//           </button>
//           <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
//             Investing
//           </button>
//           <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
//             Debt Management
//           </button>
//         </div>
//       </section>

//       {/* Blog List */}
//       <section>
//         <BlogList />
//       </section>
//     </div>
//   );
// }
