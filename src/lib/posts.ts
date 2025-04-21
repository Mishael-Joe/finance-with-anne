/**
 * Types for blog posts
 */
export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  content?: string;
}

/**
 * Mock blog post data
 * In a real application, this would be fetched from a CMS or database
 */
const posts: Post[] = [
  {
    slug: "budgeting-basics-for-beginners",
    title: "Budgeting Basics for Beginners: Start Your Financial Journey",
    date: "2024-04-15",
    category: "Budgeting",
    excerpt:
      "Learn the fundamentals of creating and maintaining a budget that works for your lifestyle and financial goals.",
    coverImage: "/budgeting.jpg?height=300&width=500",
  },
  {
    slug: "emergency-fund-essentials",
    title: "Emergency Fund Essentials: How Much Do You Really Need?",
    date: "2024-04-02",
    category: "Saving",
    excerpt:
      "Discover how to build an emergency fund that provides true financial security and peace of mind.",
    coverImage: "/saving.jpg?height=300&width=500",
  },
  {
    slug: "investing-101-getting-started",
    title: "Investing 101: Getting Started in the Stock Market",
    date: "2024-03-20",
    category: "Investing",
    excerpt:
      "A beginner's guide to understanding the stock market and making your first investment with confidence.",
    coverImage: "/investing.jpg?height=300&width=500",
  },
  {
    slug: "debt-payoff-strategies",
    title: "Debt Payoff Strategies: Snowball vs. Avalanche Method",
    date: "2024-03-10",
    category: "Debt Management",
    excerpt:
      "Compare the two most popular debt payoff strategies and discover which one is right for your financial situation.",
    coverImage: "/budgeting.jpg?height=300&width=500",
  },
  {
    slug: "retirement-planning-in-your-30s",
    title: "Retirement Planning in Your 30s: What You Need to Know",
    date: "2024-02-28",
    category: "Retirement",
    excerpt:
      "Why your 30s are a critical decade for retirement planning and the steps you should take now.",
    coverImage: "/saving.jpg?height=300&width=500",
  },
  {
    slug: "maximizing-your-401k",
    title: "Maximizing Your 401(k): Tips and Strategies",
    date: "2024-02-15",
    category: "Retirement",
    excerpt:
      "Learn how to make the most of your employer-sponsored retirement plan and set yourself up for future success.",
    coverImage: "/investing.jpg?height=300&width=500",
  },
  {
    slug: "saving-for-a-home-down-payment",
    title: "Saving for a Home Down Payment: A Step-by-Step Guide",
    date: "2024-01-30",
    category: "Saving",
    excerpt:
      "Practical strategies to save for a down payment on your first home, even in a challenging real estate market.",
    coverImage: "/saving.jpg?height=300&width=500",
  },
  {
    slug: "understanding-credit-scores",
    title:
      "Understanding Credit Scores: What Affects Your Score and Why It Matters",
    date: "2024-01-15",
    category: "Credit",
    excerpt:
      "A comprehensive guide to credit scores, including what factors influence them and how to improve yours.",
    coverImage: "/budgeting.jpg?height=300&width=500",
  },
  {
    slug: "financial-goals-setting-and-achieving",
    title: "Financial Goal Setting: How to Set and Achieve Money Goals",
    date: "2024-01-05",
    category: "Planning",
    excerpt:
      "Learn how to set SMART financial goals and create an actionable plan to achieve them.",
    coverImage: "/investing.jpg?height=300&width=500",
  },
];

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single blog post by slug
 * @param slug - The unique identifier for the blog post
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
