"use client";

import type React from "react";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import QuillEditor from "@/components/blog/quill-editor";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { UploadDropzone } from "@/utils/uploadthing";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";
import PageLoader from "@/components/ui/page-loader";
import { toast } from "sonner";

/**
 * Edit Blog Post page component
 * Allows editing an existing blog post with the Quill editor
 */
export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    tags: "",
    published: false,
  });

  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "admin") {
      router.push(
        `/admin/login?error=AccessDenied&callbackUrl=${encodeURIComponent(
          "/admin/blog/edit/" + slug
        )}`
      );
    }
  }, [status, session, router]);

  // Fetch post data on component mount
  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/posts/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const post = await response.json();

        // Convert tags array to comma-separated string
        const tagsString = post.tags ? post.tags.join(", ") : "";

        setFormData({
          title: post.title || "",
          slug: post.slug || "",
          content: post.content || "",
          excerpt: post.excerpt || "",
          featuredImage: post.featuredImage || "",
          tags: tagsString,
          published: post.published || false,
        });
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return <PageLoader />; // Still render null but only after the effect runs
  }

  /**
   * Handle input changes for form fields
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle checkbox inputs
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  /**
   * Handle Quill editor content changes
   */
  const handleEditorChange = (content: string) => {
    setFormData({
      ...formData,
      content,
    });

    // Auto-generate excerpt if empty
    if (!formData.excerpt) {
      // Strip HTML tags and get first 160 characters
      const plainText = content.replace(/<[^>]+>/g, "");
      const excerpt =
        plainText.substring(0, 160) + (plainText.length > 160 ? "..." : "");
      setFormData((prev) => ({
        ...prev,
        excerpt,
      }));
    }
  };

  /**
   * Auto-generate slug from title
   */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.content) {
        throw new Error("Title and content are required");
      }

      // Prepare tags array
      const tagsArray = formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [];

      // Send PUT request to update the blog post
      const response = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
      });

      // Handle response
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update post");
      }

      // Redirect to the blog admin page on success
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      // Handle errors
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while fetching post data
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium">
            Slug <span className="text-red-500">*</span>
          </label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder="enter-post-slug"
            required
          />
          <p className="text-xs text-muted-foreground">
            The slug is used in the URL of your post. It should be unique and
            contain only lowercase letters, numbers, and hyphens.
          </p>
        </div>

        {/* Featured Image */}
        <div className="space-y-2">
          <label htmlFor="featuredImage" className="text-sm font-medium">
            Featured Image
          </label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              // console.log("Files: ", res);
              // alert("Upload Completed");
              toast.success("Upload Completed.");
              setFormData((prev) => ({
                ...prev,
                featuredImage: res[0]?.ufsUrl,
              }));
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              // console.log("error: ", error);
              // alert(`ERROR! ${error.message}`);
              toast.error(`ERROR! ${error.message}`);
            }}
            config={{ cn: twMerge }}
            className="bg-secondary/15 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 cursor-pointer"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content <span className="text-red-500">*</span>
          </label>
          <QuillEditor
            value={formData.content}
            onChange={handleEditorChange}
            placeholder="Write your blog post content here..."
          />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-sm font-medium">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Brief summary of your post"
            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs text-muted-foreground">
            A brief summary of your post. If left empty, it will be
            automatically generated from your content.
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label htmlFor="tags" className="text-sm font-medium">
            Tags
          </label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="finance, budgeting, investing"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated list of tags.
          </p>
        </div>

        {/* Published Status */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Update Post"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
