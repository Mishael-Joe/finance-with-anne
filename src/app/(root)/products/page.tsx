"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/config";

export interface Product {
  id: string;
  title: string;
  price?: string;
  discountPrice?: string;
  originalPrice?: string;
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
    <main className="bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="relative py-20 md:py-28 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 -translate-x-1/2 top-[-120px] w-[700px] h-[700px] bg-primary/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Digital Tools for
            <span className="block text-primary">Financial Confidence</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully designed resources to help you budget smarter, earn more,
            and build lasting wealth.
          </p>
        </div>
      </section>

      {/* ================= CATEGORY FILTER ================= */}
      <section className="container mx-auto px-4 md:px-6 mb-14">
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
        >
          <TabsList className="flex flex-wrap gap-3 justify-center bg-muted p-2 rounded-xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="e-book">E-Books</TabsTrigger>
            <TabsTrigger value="coaching">Coaching</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* ================= PRODUCT GRID ================= */}
      <section className="container mx-auto px-4 md:px-6 pb-28">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="
                group relative bg-card border border-border
                rounded-2xl overflow-hidden
                shadow-sm hover:shadow-xl
                hover:-translate-y-1
                transition-all duration-300
                flex flex-col
              "
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur ${getCategoryColor(
                      product.category,
                    )}`}
                  >
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-primary">
                  {product.title}
                </h3>

                {/* Pricing */}
                <div className="mb-6">
                  {product.discountPrice && product.originalPrice ? (
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary">
                        {product.discountPrice}
                      </span>
                      <span className="line-through text-muted-foreground text-sm">
                        {product.originalPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-primary">
                      {product.price}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-auto flex gap-3">
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="premium" className="w-full">
                      Buy Now
                    </Button>
                  </a>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        Details
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {product.title}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="mt-6 whitespace-pre-line text-muted-foreground leading-relaxed">
                        {product.description}
                      </div>

                      <div className="mt-8">
                        <a
                          href={product.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="premium" className="w-full">
                            Purchase Now
                          </Button>
                        </a>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
