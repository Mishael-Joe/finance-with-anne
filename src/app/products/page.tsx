"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/config";

// Product type
export interface Product {
  id: string;
  title: string;
  price?: string; // fallback if no discount is used
  discountPrice?: string; // new field
  originalPrice?: string; // new field (for strike-through)
  category: string;
  image: string;
  externalUrl: string;
  description: string;
}

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

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Products and Services
      </h1>

      {/* Category Tabs */}
      <Tabs
        defaultValue="all"
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="mb-8"
      >
        <TabsList className="overflow-x-auto flex-nowrap justify-start">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="e-book">E-Books</TabsTrigger>
          {/* <TabsTrigger value="template">Templates</TabsTrigger> */}
          <TabsTrigger value="coaching">Coaching</TabsTrigger>
          {/* <TabsTrigger value="course">Courses</TabsTrigger> */}
        </TabsList>
      </Tabs>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[4/3] relative bg-muted">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                    product.category
                  )}`}
                >
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 line-clamp-1">
                {product.title}
              </h3>
              <div className="mb-4">
                {product.discountPrice && product.originalPrice ? (
                  <div className="space-x-2">
                    <span className="text-primary font-bold text-lg">
                      {product.discountPrice}
                    </span>
                    <span className="line-through text-muted-foreground text-sm">
                      {product.originalPrice}
                    </span>
                  </div>
                ) : (
                  <p className="text-primary font-semibold">{product.price}</p>
                )}
              </div>

              <div className="flex gap-2">
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="primary" className="w-full cursor-pointer">
                    Buy Now
                  </Button>
                </a>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex-1 cursor-pointer"
                    >
                      More Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">
                        {product.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="whitespace-pre-line text-sm text-gray-700 mt-4">
                      {product.description}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
