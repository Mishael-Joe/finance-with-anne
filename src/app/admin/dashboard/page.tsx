import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions, isAdmin } from "@/lib/auth";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, ShoppingBag, Users, FileText } from "lucide-react";

/**
 * Admin Dashboard Page
 * Protected page that only authenticated admin users can access
 */
export default async function AdminDashboardPage() {
  // Get the user's session
  const session = await getServerSession(authOptions);

  // If not authenticated or not an admin, redirect to login
  if (!session || !isAdmin(session)) {
    redirect(
      `/admin/login?error=AccessDenied&callbackUrl=${encodeURIComponent(
        "/admin/dashboard"
      )}`
    );
  }

  // Dashboard data (in a real app, this would come from the database)
  const dashboardData = {
    products: 12,
    orders: 48,
    users: 156,
    posts: 24,
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name}
          </p>
        </div>
      </div>

      {/* Dashboard stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.products}</div>
            <p className="text-xs text-muted-foreground">
              Digital products in your store
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.orders}</div>
            <p className="text-xs text-muted-foreground">
              Total orders processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.users}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.posts}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Quick links */}
      {/* <h2 className="text-xl font-bold mb-4">Quick Links</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/products" className="block">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
              <CardDescription>
                Add, edit, or remove digital products
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/blog" className="block">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Manage Blog</CardTitle>
              <CardDescription>Create and edit blog posts</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        {/* <Link href="/admin/orders" className="block">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>View Orders</CardTitle>
              <CardDescription>
                Manage customer orders and payments
              </CardDescription>
            </CardHeader>
          </Card>
        </Link> */}
      </div>
    </div>
  );
}
