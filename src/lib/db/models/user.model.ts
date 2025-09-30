import mongoose, { Schema, type Document, type Model } from "mongoose";
import { connectToDatabase } from "../mongoose";

export enum Role {
  User = "user",
  Admin = "admin",
}

/**
 * Interface for User document
 * All monetary values (if any) are assumed to be stored in kobo to avoid floating-point errors.
 */
export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for users
 */
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: [true, "User role is required"],
    },
  },
  {
    // Adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

/**
 * Get the User model
 * Uses a cached model if available to prevent model redefinition during development
 *
 * @returns Mongoose User model
 */
export async function getUserModel(): Promise<Model<IUser>> {
  // Connect to the database
  await connectToDatabase();

  // Use existing model if it exists, otherwise create a new one
  return (
    (mongoose.models.User as Model<IUser>) ||
    mongoose.model<IUser>("User", UserSchema)
  );
}

/**
 * Get a user by email
 * @param email - The user's email
 * @param lean - Whether to return a plain object (lean) or a Mongoose document
 * @returns A single user document or null
 */
export async function getUserByEmail(
  email: string,
  lean = false
): Promise<IUser | null> {
  await connectToDatabase();
  const User = await getUserModel();

  return lean ? User.findOne({ email }).lean() : User.findOne({ email });
}
