import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/db/models/Post";
import { connectToDatabase } from "@/lib/db/mongoose";
import { formatDate } from "@/lib/utils";
import NewsletterSignup from "@/components/newsletter-signup";
import HtmlContent from "@/components/blog/html-content";

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    // Connect to the database
    await connectToDatabase();

    const { slug } = await params;

    // Get the post data based on the slug
    const Post = await getPostBySlug(slug);

    if (!Post) {
      return {
        title: "Post Not Found | Finance with Anne",
      };
    }

    return {
      title: `${Post.title} | Finance with Anne`,
      description: Post.excerpt,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post | Finance with Anne",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Await the params to get the slug
    const { slug } = await params;

    // Get the post model
    const Post = await getPostBySlug(slug);

    // If post not found, display a 404 page
    if (!Post) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Back to blog link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-primary hover:text-primary-light font-medium flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </div>

        {/* Blog post header */}
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <div className="mb-6">
              {Post.tags && Post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {Post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {Post.title}
            </h1>
            <div className="flex items-center text-muted-foreground mb-6">
              <div className="mr-4">
                <Image
                  src={
                    Post.author === "Mishael Joseph"
                      ? "/testimonials/mishael.jpg?height=40&width=40"
                      : "/anne.jpg?height=40&width=40"
                  }
                  alt="Anne"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="font-medium">{Post.author || "Anne Johnson"}</p>
                <p className="text-sm">{formatDate(Post.createdAt)}</p>
              </div>
            </div>
            {Post.featuredImage && (
              <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
                <Image
                  src={Post.featuredImage || "/placeholder.svg"}
                  alt={Post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Blog post content */}
          <div className="mb-12">
            <HtmlContent content={Post.content} />
          </div>

          {/* Author bio */}
          {/* <div className="mt-12 p-6 bg-muted rounded-lg">
            <div className="flex items-center">
              <div className="mr-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Anne"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Anne Johnson</h3>
                <p className="text-muted-foreground">
                  Certified Financial Educator and founder of Finance with Anne.
                  Passionate about helping people achieve financial freedom
                  through education and practical strategies.
                </p>
              </div>
            </div>
          </div> */}

          {/* Newsletter signup */}
          <div className="mt-12 p-8 bg-secondary/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Enjoy this article?
            </h3>
            <p className="text-center mb-6">
              Subscribe to get more financial tips and insights delivered to
              your inbox.
            </p>
            <NewsletterSignup />
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
