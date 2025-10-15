import mongoose, { Schema, type Document, type Model } from "mongoose";
import { connectToDatabase } from "../mongoose";

export enum Authors {
  AnneEnwere = "Anne Enwere",
  FunmiAzeez = "Funmi Azeez",
  Mishael = "Mishael Joseph",
}

export const authors = {
  [Authors.AnneEnwere]: Authors.AnneEnwere,
  [Authors.FunmiAzeez]: Authors.FunmiAzeez,
  [Authors.Mishael]: Authors.Mishael,
};

export type AuthorsType = keyof typeof authors;

/**
 * Interface for Post document
 */
export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category:
    | "Money Mindset"
    | "Earning More"
    | "Saving & Budgeting"
    | "Local Investing"
    | "Global Investing"
    | "Financial Tools"
    | "Life Goals"
    | "Success Stories";
  author: Authors;
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
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Money Mindset",
        "Make More Money",
        "Saving & Budgeting",
        "Nigerian Investments",
        "Invest Globally",
        "Financial Tools",
        "Life Goals",
        "Success Stories",
      ],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      enum: Object.values(Authors),
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
