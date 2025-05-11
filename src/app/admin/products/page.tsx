import Link from "next/link";
import Image from "next/image";
import { getProductModel } from "@/lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongoose";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/button";
import { Edit, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import currency from "currency.js";
import { redirect } from "next/navigation";
import { authOptions, isAdmin } from "@/lib/auth";
import { getServerSession } from "next-auth";

/**
 * Products Admin Page
 * Displays a list of all digital products with options to create, edit, and delete
 */
export default async function ProductsAdminPage() {
  const session = await getServerSession(authOptions);
  // If not authenticated or not an admin, redirect to login
  if (!session || !isAdmin(session)) {
    redirect(
      `/admin/login?error=AccessDenied&callbackUrl=${encodeURIComponent(
        "/admin/products"
      )}`
    );
  }

  // Connect to the database
  await connectToDatabase();

  // Get the Product model
  const Product = await getProductModel();

  // Fetch all products, sorted by creation date (newest first)
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();

  // Format price for display
  const formatPrice = (price: number) => {
    return currency(price / 100, { symbol: "₦", precision: 2 }).format();
  };

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "e-book":
        return "bg-blue-100 text-blue-800";
      case "template":
        return "bg-purple-100 text-purple-800";
      case "coaching":
        return "bg-amber-100 text-amber-800";
      case "course":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Digital Products</h1>
        <Button href="/admin/products/new" variant="primary">
          <Plus className="mr-2 h-4 w-4" /> New Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-muted-foreground"
                  >
                    No products found. Create your first product!
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product._id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          {product.coverImages &&
                          product.coverImages.length > 0 ? (
                            <div className="relative h-10 w-10 rounded-md overflow-hidden">
                              <Image
                                src={
                                  product.coverImages[0] || "/placeholder.svg"
                                }
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                No img
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            <Link
                              href={`/admin/products/edit/${product.slug}`}
                              className="hover:text-primary"
                            >
                              {product.title}
                            </Link>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {product.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
                          product.category
                        )}`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.isVisible ? (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 hover:bg-green-100"
                        >
                          <Eye className="h-3 w-3 mr-1" /> Visible
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800 hover:bg-gray-100"
                        >
                          <EyeOff className="h-3 w-3 mr-1" /> Hidden
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(product.createdAt.toString())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/admin/products/edit/${product.slug}`}
                          className="text-primary hover:text-primary-light"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <Link
                          href={`/admin/products/delete/${product.slug}`}
                          className="text-red-500 hover:text-red-700"
                        >
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
  );
}
