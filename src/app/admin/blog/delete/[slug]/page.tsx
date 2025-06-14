"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/button";
import { useSession } from "next-auth/react";
import PageLoader from "@/components/ui/page-loader";

/**
 * Delete Blog Post page component
 * Shows post details and asks for confirmation before deleting
 */
export default function DeleteBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "admin") {
      router.push(
        `/admin/login?error=AccessDenied&callbackUrl=${encodeURIComponent(
          "/admin/blog/delete/" + slug
        )}`
      );
    }
  }, [status, session, router, slug]);

  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch post");
        const postData = await response.json();
        setPost(postData);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    if (slug && status === "authenticated" && session?.user?.role === "admin") {
      fetchPost();
    }
  }, [slug, status, session]);

  if (status === "loading") {
    return <PageLoader />;
  }

  /**
   * Handle post deletion
   */
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      const response = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete post");
      }

      // Redirect to the blog admin page on success
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setIsDeleting(false);
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

  // Show error state if post couldn't be loaded
  if (error && !post) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 text-red-500 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-2 text-primary">Error</h2>
            <p>{error}</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Delete Blog Post</h1>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-4 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-600 mb-2">
                Warning: This action cannot be undone
              </h2>
              <p className="text-red-600 mb-0">
                You are about to permanently delete this blog post. This action
                cannot be reversed.
              </p>
            </div>
          </div>
        </div>

        {/* Post details */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            {post?.title}
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex">
              <span className="font-medium w-24">Slug:</span>
              <span className="text-muted-foreground">{post?.slug}</span>
            </div>

            <div className="flex">
              <span className="font-medium w-24">Created:</span>
              <span className="text-muted-foreground">
                {post?.createdAt ? formatDate(post.createdAt) : "Unknown"}
              </span>
            </div>

            <div className="flex">
              <span className="font-medium w-24">Status:</span>
              <span
                className={`${
                  post?.published ? "text-green-600" : "text-yellow-600"
                } font-medium`}
              >
                {post?.published ? "Published" : "Draft"}
              </span>
            </div>

            {post?.tags && post.tags.length > 0 && (
              <div className="flex">
                <span className="font-medium w-24">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block bg-muted px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {post?.excerpt && (
            <div className="border-t pt-4 mb-4">
              <p className="text-sm text-muted-foreground italic">
                {post.excerpt}
              </p>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-between">
          <Link href="/admin/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </Link>

          <Button
            variant="primary"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Permanently"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
