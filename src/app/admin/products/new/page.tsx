"use client";

import type React from "react";

import { useState, type FormEvent, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QuillEditor from "@/components/blog/quill-editor";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Loader2, Upload, X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import PageLoader from "@/components/ui/page-loader";

/**
 * New Product page component
 * Allows creating a new digital product with file and image uploads
 */
export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const { data: session, status } = useSession();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    fileUrl: "",
    coverImages: [] as string[],
    slug: "",
    isVisible: true,
  });

  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "admin") {
      router.push(
        `/admin/login?error=AccessDenied&callbackUrl=${encodeURIComponent(
          "/admin/products/new"
        )}`
      );
    }
  }, [status, session, router]);

  /**
   * Handle image upload
   */
  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploadingImage(true);
        setError(null);

        // Get the file extension
        const fileExt = file.name.split(".").pop();

        // Request a presigned URL from the server
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileType: "images",
            fileName: `product-${Date.now()}.${fileExt}`,
            contentType: file.type,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get upload URL");
        }

        const { uploadUrl, filePath } = await response.json();

        // Upload the file directly to S3
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        // Add the new image URL to the coverImages array
        setFormData((prev) => ({
          ...prev,
          coverImages: [...prev.coverImages, filePath],
        }));

        toast.success("Your image has been added to the product.");
      } catch (err) {
        console.error("Error uploading image:", err);
        setError(err instanceof Error ? err.message : "Failed to upload image");

        toast.error("There was an error uploading your image.");
      } finally {
        setUploadingImage(false);
        // Clear the input value so the same file can be selected again
        e.target.value = "";
      }
    },
    [toast]
  );

  /**
   * Handle product file upload
   */
  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploadingFile(true);
        setError(null);

        // Get the file extension
        const fileExt = file.name.split(".").pop();

        // Request a presigned URL from the server
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileType: "products",
            fileName: `${formData.slug || `product-${Date.now()}`}.${fileExt}`,
            contentType: file.type,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get upload URL");
        }

        const { uploadUrl, filePath } = await response.json();

        // Upload the file directly to S3
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        // Set the fileUrl in the form data
        setFormData((prev) => ({
          ...prev,
          fileUrl: filePath,
        }));

        toast.success("Your product file has been uploaded.");
      } catch (err) {
        console.error("Error uploading file:", err);
        setError(err instanceof Error ? err.message : "Failed to upload file");

        toast.error("There was an error uploading your product file.");
      } finally {
        setUploadingFile(false);
        // Clear the input value so the same file can be selected again
        e.target.value = "";
      }
    },
    [formData.slug, toast]
  );

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
   * Handle select changes
   */
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handle switch changes
   */
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  /**
   * Handle Quill editor content changes
   */
  const handleEditorChange = (content: string) => {
    setFormData({
      ...formData,
      description: content,
    });
  };

  /**
   * Auto-generate slug from title
   */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      // Only auto-generate slug if it hasn't been manually edited
      slug:
        formData.slug === ""
          ? title
              .toLowerCase()
              .replace(/[^\w\s]/gi, "")
              .replace(/\s+/g, "-")
          : formData.slug,
    });
  };

  /**
   * Remove an image from the coverImages array
   */
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      coverImages: prev.coverImages.filter((_, i) => i !== index),
    }));
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
      if (
        !formData.title ||
        !formData.description ||
        !formData.price ||
        !formData.category
      ) {
        throw new Error("Title, description, price, and category are required");
      }

      // Validate category-specific fields
      if (
        ["e-book", "template"].includes(formData.category) &&
        !formData.fileUrl
      ) {
        throw new Error("File upload is required for e-books and templates");
      }

      // Validate cover images
      if (formData.coverImages.length === 0) {
        throw new Error("At least one cover image is required");
      }

      // Convert price to a number
      const price = Number.parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        throw new Error("Price must be a valid positive number");
      }

      // Send POST request to create the product
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price,
        }),
      });

      // Handle response
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create product");
      }

      // Show success toast
      toast.success("Your product has been created successfully.");

      // Redirect to the products admin page on success
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      // Handle errors
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Create New Digital Product</h1>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter product title"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="product-slug"
                required
              />
              <p className="text-xs text-muted-foreground">
                The slug is used in the URL of your product. It should be unique
                and contain only lowercase letters, numbers, and hyphens.
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">
                Price (₦) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the price in Naira. This will be automatically converted
                to kobo for storage.
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="e-book">E-Book</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                  <SelectItem value="coaching">Coaching</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Visibility */}
            <div className="flex items-center space-x-2">
              <Switch
                id="isVisible"
                checked={formData.isVisible}
                onCheckedChange={(checked) =>
                  handleSwitchChange("isVisible", checked)
                }
              />
              <Label htmlFor="isVisible">Product is visible to customers</Label>
            </div>
          </div>

          <div className="space-y-6">
            {/* Product File Upload (for e-books and templates) */}
            {["e-book", "template", ""].includes(formData.category) && (
              <div className="space-y-2">
                <Label htmlFor="productFile">
                  Product File{" "}
                  {["e-book", "template"].includes(formData.category) && (
                    <span className="text-red-500">*</span>
                  )}
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  {formData.fileUrl ? (
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium mb-2">
                        File uploaded successfully
                      </p>
                      <p className="text-xs text-muted-foreground mb-4 truncate max-w-full">
                        {formData.fileUrl.split("/").pop()}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setFormData({ ...formData, fileUrl: "" })
                        }
                      >
                        <X className="mr-2 h-4 w-4" /> Remove File
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium mb-1">
                        Upload product file
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PDF, ZIP, or other file types
                      </p>
                      <div className="relative">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={uploadingFile}
                        >
                          {uploadingFile ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                              Uploading...
                            </>
                          ) : (
                            <>Select File</>
                          )}
                        </Button>
                        <input
                          id="productFile"
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileUpload}
                          disabled={uploadingFile}
                        />
                      </div>
                    </>
                  )}
                </div>
                {["e-book", "template"].includes(formData.category) && (
                  <p className="text-xs text-muted-foreground">
                    Upload the file that customers will download after purchase.
                  </p>
                )}
              </div>
            )}

            {/* Cover Images */}
            <div className="space-y-2">
              <Label htmlFor="coverImage">
                Cover Images <span className="text-red-500">*</span>
              </Label>

              {/* Image preview grid */}
              {formData.coverImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {formData.coverImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md overflow-hidden border"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Cover image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white hover:bg-black/70 transition-colors"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Image upload button */}
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <div className="mb-4">
                  <Plus className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium mb-1">Add cover image</p>
                <p className="text-xs text-muted-foreground mb-4">
                  JPG, PNG or GIF
                </p>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Uploading...
                      </>
                    ) : (
                      <>Select Image</>
                    )}
                  </Button>
                  <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload at least one image to showcase your product.
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <QuillEditor
            value={formData.description}
            onChange={handleEditorChange}
            placeholder="Write your product description here..."
          />
          <p className="text-xs text-muted-foreground">
            Provide a detailed description of your product. You can use
            formatting to make it more attractive.
          </p>
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
              "Create Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
