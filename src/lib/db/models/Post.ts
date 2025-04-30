import mongoose, { Schema, type Document, type Model } from "mongoose";
import { connectToDatabase } from "../mongoose";

/**
 * Interface for Post document
 */
export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for blog posts
 */
const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [500, "Excerpt cannot be more than 500 characters"],
    },
    featuredImage: {
      type: String,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      // default: "Anne Johnson",
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Add timestamps for createdAt and updatedAt
    timestamps: true,
  }
);

/**
 * Get the Post model
 * Uses a cached model if available to prevent model redefinition during development
 *
 * @returns Mongoose Post model
 */
export async function getPostModel(): Promise<Model<IPost>> {
  // Connect to the database
  await connectToDatabase();

  // Use existing model if it exists, otherwise create a new one
  return (
    (mongoose.models.Post as Model<IPost>) ||
    mongoose.model<IPost>("Post", PostSchema)
  );
}

/**
 * Get a single blog post by slug
 * @param slug - The unique identifier for the blog post
 */
export async function getPostBySlug(slug: string): Promise<IPost | null> {
  await connectToDatabase();
  const Post = await getPostModel();
  return Post.findOne({ slug }).lean();
}

// Step 1: Track Your Spending

// Before you can manage your money, you need to know where it’s going. Start by reviewing your last month of expenses. You’ll be surprised at how the little things add up.

// Step 2: Create a Realistic Budget

// A budget isn’t about restriction—it’s about intention. Allocate funds to essentials, savings, and guilt-free spending, and make sure your budget aligns with your values.

// Step 3: Build an Emergency Fund

// Set aside at least 3–6 months’ worth of basic expenses. Start small—₦5,000 a week can go a long way. Having a cushion provides peace of mind and protects you from unexpected debt.

// Step 4: Cut Unnecessary Expenses

// Audit your subscriptions, daily habits, and impulse buys. Redirect those funds toward savings or paying off debt. Small sacrifices today can lead to big rewards tomorrow.

// Step 5: Set Clear Financial Goals

// Whether it's saving for rent, school fees, or your first investment, define your short and long-term goals. Write them down and track your progress monthly.

// Remember: Financial freedom doesn’t happen overnight, but with consistency and the right habits, it’s absolutely within your reach. You’ve got this!
