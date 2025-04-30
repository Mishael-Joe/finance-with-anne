import Link from "next/link"
import { getPostModel } from "@/lib/db/models/Post"
import { connectToDatabase } from "@/lib/db/mongoose"
import { formatDate } from "@/lib/utils"
import Button from "@/components/ui/button"
import { Edit, Plus, Trash2 } from "lucide-react"

/**
 * Blog Admin Page
 * Displays a list of all blog posts with options to create, edit, and delete
 */
export default async function BlogAdminPage() {
  // Connect to the database
  await connectToDatabase()

  // Get the Post model
  const Post = await getPostModel()

  // Fetch all posts, sorted by creation date (newest first)
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean()

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Button href="/admin/blog/new" variant="primary">
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-muted-foreground">
                    No blog posts found. Create your first post!
                  </td>
                </tr>
              ) : (
                posts.map((post: any) => (
                  <tr key={post._id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary" target="_blank">
                          {post.title}
                        </Link>
                      </div>
                      <div className="text-xs text-muted-foreground">{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(post.createdAt.toString())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/admin/blog/edit/${post.slug}`} className="text-primary hover:text-primary-light">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <Link href={`/admin/blog/delete/${post.slug}`} className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
