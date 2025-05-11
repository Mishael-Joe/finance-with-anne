import mongoose, { Schema, type Document, type Model } from "mongoose";
import { connectToDatabase } from "../mongoose";
import slugify from "slugify";
import currency from "currency.js";

/**
 * Interface for Product document
 */
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number; // Stored in kobo (smallest currency unit) to avoid floating point issues
  category: "e-book" | "template" | "coaching" | "course";
  fileUrl?: string; // Required for downloadable products
  coverImages: string[]; // Array of image URLs
  slug: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Virtual methods
  formattedPrice: string; // Returns price in Naira format (₦)
}

/**
 * Mongoose schema for digital products
 */
const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      // Store price in kobo (smallest currency unit) to avoid floating point issues
      set: (price: number) => Math.round(currency(price).multiply(100).value),
      get: (price: number) => currency(price / 100).value,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["e-book", "template", "coaching", "course"],
        message: "Category must be one of: e-book, template, coaching, course",
      },
    },
    fileUrl: {
      type: String,
      // Required only for downloadable products
      validate: {
        validator: function (this: IProduct, fileUrl: string) {
          if (["e-book", "template"].includes(this.category) && !fileUrl) {
            return false;
          }
          return true;
        },
        message: "File URL is required for e-books and templates",
      },
    },
    coverImages: {
      type: [String],
      default: [],
      validate: {
        validator: (images: string[]) => images.length > 0,
        message: "At least one cover image is required",
      },
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Add timestamps for createdAt and updatedAt
    timestamps: true,
    // Enable virtuals
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

/**
 * Virtual for formatted price in Naira
 */
ProductSchema.virtual("formattedPrice").get(function (this: IProduct) {
  return currency(this.price / 100, { symbol: "₦", precision: 2 }).format();
});

/**
 * Pre-save middleware to generate slug if not provided
 */
ProductSchema.pre("save", async function (next) {
  if (!this.slug) {
    // Generate slug from title
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    // Check if slug already exists and make it unique if needed
    const Product = mongoose.model<IProduct>("Product");
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
    const productsWithSlug = await Product.find({ slug: slugRegEx });

    if (productsWithSlug.length > 0) {
      // Add a unique number to the slug
      this.slug = `${this.slug}-${productsWithSlug.length + 1}`;
    }
  }
  next();
});

/**
 * Get the Product model
 * Uses a cached model if available to prevent model redefinition during development
 *
 * @returns Mongoose Product model
 */
export async function getProductModel(): Promise<Model<IProduct>> {
  // Connect to the database
  await connectToDatabase();

  // Use existing model if it exists, otherwise create a new one
  return (
    (mongoose.models.Product as Model<IProduct>) ||
    mongoose.model<IProduct>("Product", ProductSchema)
  );
}

/**
 * Get all products
 * @param options - Query options (visible only, category filter, etc.)
 */
export async function getProducts(
  options: {
    visibleOnly?: boolean;
    category?: string;
    limit?: number;
    skip?: number;
  } = {}
): Promise<IProduct[]> {
  await connectToDatabase();
  const Product = await getProductModel();

  // Build query
  const query: any = {};

  // Filter by visibility if specified
  if (options.visibleOnly) {
    query.isVisible = true;
  }

  // Filter by category if specified
  if (options.category) {
    query.category = options.category;
  }

  // Create base query
  let productQuery = Product.find(query).sort({ createdAt: -1 });

  // Apply pagination if specified
  if (options.skip !== undefined) {
    productQuery = productQuery.skip(options.skip);
  }

  if (options.limit !== undefined) {
    productQuery = productQuery.limit(options.limit);
  }

  return productQuery.lean();
}

/**
 * Get a single product by slug
 * @param slug - The unique identifier for the product
 */
export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  await connectToDatabase();
  const Product = await getProductModel();
  return Product.findOne({ slug }).lean();
}
