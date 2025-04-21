import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import NewsletterSignup from "@/components/newsletter-signup";

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Get the post data based on the slug
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Finance with Anne",
    };
  }

  return {
    title: `${post.title} | Finance with Anne`,
    description: post.excerpt,
  };
}

// Generate static paths for all blog posts
export function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Get the post data based on the slug
  const post = getPostBySlug(params.slug);

  // If post not found, display a message
  if (!post) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist.</p>
        <Link
          href="/blog"
          className="text-secondary hover:text-secondary-light font-medium flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Back to blog link */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-secondary hover:text-secondary-light font-medium flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </div>

      {/* Blog post header */}
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="mb-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-muted-foreground mb-6">
            <div className="mr-4">
              <Image
                src="/anne.jpg?height=40&width=40"
                alt="Anne"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-medium">Anne Johnson</p>
              <p className="text-sm">{formatDate(post.date)}</p>
            </div>
          </div>
          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image
              src={post.coverImage || "/placeholder.svg?height=600&width=1200"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Blog post content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg font-medium mb-6">{post.excerpt}</p>

          {/* This would be the actual blog content, using placeholder text for now */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
            auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>

          <h2>Understanding Your Financial Goals</h2>
          <p>
            Ut in nulla enim. Phasellus molestie magna non est bibendum non
            venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
            Mauris iaculis porttitor posuere.
          </p>
          <p>
            Praesent id metus massa, ut blandit odio. Proin quis tortor orci.
            Etiam at risus et justo dignissim congue. Donec congue lacinia dui,
            a porttitor lectus condimentum laoreet.
          </p>

          <h2>Creating a Plan That Works</h2>
          <p>
            Nunc nec porta felis. Curabitur non nulla sit amet nisl tempus
            convallis quis ac lectus. Donec mollis hendrerit risus. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia Curae.
          </p>
          <ul>
            <li>Define clear, measurable financial goals</li>
            <li>Create a realistic timeline for achieving each goal</li>
            <li>Identify potential obstacles and plan for them</li>
            <li>Regularly review and adjust your plan as needed</li>
          </ul>

          <h2>Taking Action</h2>
          <p>
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
            nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p>
            Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Vestibulum id ligula porta felis euismod semper.
          </p>
        </div>

        {/* Author bio */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <div className="flex items-center">
            <div className="mr-4">
              <Image
                src="/anne.jpg?height=80&width=80"
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
        </div>

        {/* Related posts would go here */}

        {/* Newsletter signup */}
        <div className="mt-12 p-8 bg-secondary/10 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Enjoy this article?
          </h3>
          <p className="text-center mb-6">
            Subscribe to get more financial tips and insights delivered to your
            inbox.
          </p>
          <NewsletterSignup />
        </div>
      </article>
    </div>
  );
}
