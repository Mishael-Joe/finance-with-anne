"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, ShoppingCart, X } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HtmlContent from "@/components/blog/html-content";
import currency from "currency.js";

// Define product type
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  fileUrl?: string;
  coverImages: string[];
  slug: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  formattedPrice: string;
}

// Define cart item type
interface CartItem {
  product: Product;
  quantity: number;
}

// Define customer info type
interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

/**
 * Product Purchase Page
 * Displays a catalog of products and a checkout form
 */
export default function ProductsPage() {
  // State for products and loading
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for selected product and cart
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // State for customer info
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // State for active category
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // State for checkout process
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/products?visibleOnly=true");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Format price for display
  const formatPrice = (price: number) => {
    return currency(price / 100, { symbol: "₦", precision: 2 }).format();
  };

  // Add product to cart
  const addToCart = (product: Product) => {
    // Check if product is already in cart
    const existingItem = cart.find((item) => item.product._id === product._id);

    if (existingItem) {
      // Update quantity if product is already in cart
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item to cart
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product._id !== productId));
  };

  // Update product quantity in cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;

    setCart(
      cart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Handle customer info change
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // Handle checkout submission
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      setError("Please fill in all required fields");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // In a real application, you would send the order to your backend
      // For this example, we'll simulate a successful order
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and show success message
      setOrderComplete(true);
      setCart([]);
    } catch (err) {
      console.error("Error processing order:", err);
      setError("Failed to process your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Digital Products
      </h1>

      {/* Order complete message */}
      {orderComplete && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <h2 className="text-xl font-bold mb-2">Thank you for your order!</h2>
          <p>
            Your order has been received and is being processed. You will
            receive an email with your purchase details shortly.
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Product Catalog */}
        <div className="w-full lg:w-2/3">
          {/* Category tabs */}
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-8"
          >
            <TabsList className="w-full overflow-x-auto flex-nowrap justify-start">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="e-book">E-Books</TabsTrigger>
              <TabsTrigger value="template">Templates</TabsTrigger>
              <TabsTrigger value="coaching">Coaching</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Loading state */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  {/* Product image */}
                  <div className="aspect-[4/3] relative bg-muted">
                    {product.coverImages && product.coverImages.length > 0 ? (
                      <Image
                        src={product.coverImages[0] || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
                          product.category
                        )}`}
                      >
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-primary font-semibold mb-4">
                      {product.formattedPrice}
                    </p>

                    <div className="flex space-x-2">
                      {/* View details button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setSelectedProduct(product)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{product.title}</DialogTitle>
                            <DialogDescription>
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(
                                  product.category
                                )}`}
                              >
                                {product.category}
                              </span>
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {/* Product images */}
                            <div>
                              {product.coverImages &&
                              product.coverImages.length > 0 ? (
                                <div className="aspect-square relative rounded-md overflow-hidden">
                                  <Image
                                    src={
                                      product.coverImages[0] ||
                                      "/placeholder.svg"
                                    }
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                                  <span className="text-muted-foreground">
                                    No image
                                  </span>
                                </div>
                              )}

                              {/* Additional images */}
                              {product.coverImages &&
                                product.coverImages.length > 1 && (
                                  <div className="grid grid-cols-4 gap-2 mt-2">
                                    {product.coverImages
                                      .slice(1)
                                      .map((image, index) => (
                                        <div
                                          key={index}
                                          className="aspect-square relative rounded-md overflow-hidden"
                                        >
                                          <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.title} - Image ${
                                              index + 2
                                            }`}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                      ))}
                                  </div>
                                )}
                            </div>

                            {/* Product details */}
                            <div>
                              <h3 className="text-2xl font-bold mb-2">
                                {product.title}
                              </h3>
                              <p className="text-xl text-primary font-semibold mb-4">
                                {product.formattedPrice}
                              </p>

                              <div className="mb-6">
                                <HtmlContent content={product.description} />
                              </div>

                              <Button
                                variant="primary"
                                className="w-full"
                                onClick={() => {
                                  addToCart(product);
                                }}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to
                                Cart
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Add to cart button */}
                      <Button
                        variant="primary"
                        className="flex-1"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Checkout Form */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6 border border-border h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6">Checkout</h2>

          {/* Cart items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Your Cart</h3>

            {cart.length === 0 ? (
              <div className="text-center py-8 bg-muted rounded-lg">
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 mr-3">
                        {item.product.coverImages &&
                        item.product.coverImages.length > 0 ? (
                          <div className="relative h-12 w-12 rounded-md overflow-hidden">
                            <Image
                              src={
                                item.product.coverImages[0] ||
                                "/placeholder.svg"
                              }
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                              No img
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.product.formattedPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          type="button"
                          className="px-2 py-1 text-sm"
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-1 text-sm"
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex justify-between items-center pt-4 font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Customer information form */}
          <form onSubmit={handleCheckout}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleCustomerInfoChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleCustomerInfoChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleCustomerInfoChange}
                  placeholder="+234 800 123 4567"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">
                  Address{" "}
                  <span className="text-muted-foreground text-sm">
                    (Optional)
                  </span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleCustomerInfoChange}
                  placeholder="123 Main St, City, Country"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Required for physical products, optional for digital products.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting || cart.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Complete Purchase"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
