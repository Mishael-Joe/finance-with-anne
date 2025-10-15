"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Trash2, Edit, Plus, XCircle } from "lucide-react";
import { DiscountTypeEnum } from "@/lib/db/models/coupon.model";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Coupon {
  _id: string;
  code: string;
  discountType: DiscountTypeEnum;
  discountValue: number;
  expiresAt: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export default function CouponManagerPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);

  const [form, setForm] = useState({
    code: "",
    discountType: DiscountTypeEnum.Percentage,
    discountValue: 0,
    expiresAt: "",
    usageLimit: "",
    isActive: true,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  async function fetchCoupons() {
    setIsLoading(true);
    const { data } = await axios.get("/api/coupon");
    setCoupons(data);
    setIsLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { id, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingCoupon) {
        await axios.put(`/api/coupon/${editingCoupon._id}`, {
          ...form,
          code: form.code.toUpperCase().trim(),
        });
        toast.success("Coupon updated!");
      } else {
        await axios.post("/api/coupon", {
          ...form,
          code: form.code.toUpperCase().trim(),
        });
        toast.success("Coupon created!");
      }
      resetForm();
      fetchCoupons();
    } catch (err) {
      toast.error("Error saving coupon");
    }
  }

  function resetForm() {
    setForm({
      code: "",
      discountType: DiscountTypeEnum.Percentage,
      discountValue: 0,
      expiresAt: "",
      usageLimit: "",
      isActive: true,
    });
    setEditingCoupon(null);
    setIsDialogOpen(false);
  }

  function handleEdit(coupon: Coupon) {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      expiresAt: coupon.expiresAt.split("T")[0],
      usageLimit: coupon.usageLimit?.toString() || "",
      isActive: coupon.isActive,
    });
    setIsDialogOpen(true);
  }

  function confirmDelete(id: string) {
    setCouponToDelete(id);
    setDeleteDialogOpen(true);
  }

  async function handleDelete() {
    if (!couponToDelete) return;
    await axios.delete(`/api/coupon/${couponToDelete}`);
    toast.success("Coupon deleted!");
    setDeleteDialogOpen(false);
    setCouponToDelete(null);
    fetchCoupons();
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col w-full sm:justify-between sm:items-start sm:flex-row gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Coupon Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, edit, or remove discount coupons.
          </p>
        </div>

        {/* New Coupon Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Coupon
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div>
                <Label className="mb-2" htmlFor="code">
                  Coupon Code
                </Label>
                <Input
                  id="code"
                  value={form.code}
                  onChange={handleChange}
                  required
                  placeholder="E.g. SAVE10"
                />
              </div>

              <div>
                <Label className="mb-2" htmlFor="discountType">
                  Discount Type
                </Label>
                <select
                  id="discountType"
                  value={form.discountType}
                  onChange={handleChange}
                  className="border rounded-md w-full p-2"
                >
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat Amount</option>
                </select>
              </div>

              <div>
                <Label className="mb-2" htmlFor="discountValue">
                  Discount Value
                </Label>
                <Input
                  id="discountValue"
                  type="text"
                  value={form.discountValue === 0 ? "" : form.discountValue}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setForm((prev) => ({ ...prev, discountValue: 0 }));
                    } else {
                      const val = Number(e.target.value);
                      if (!isNaN(val) && val >= 0) {
                        setForm((prev) => ({ ...prev, discountValue: val }));
                      }
                    }
                  }}
                  required
                />
              </div>

              <div>
                <Label className="mb-2" htmlFor="expiresAt">
                  Expiry Date
                </Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={form.expiresAt}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label className="mb-2" htmlFor="usageLimit">
                  Usage Limit (optional)
                </Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={form.usageLimit === "" ? "" : form.usageLimit}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setForm((prev) => ({ ...prev, usageLimit: "" }));
                    } else {
                      const num = Number(val);
                      if (!isNaN(num) && num >= 0) {
                        setForm((prev) => ({ ...prev, usageLimit: val }));
                      }
                    }
                  }}
                  placeholder="Leave blank for unlimited"
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClink={() => {
                      if (editingCoupon) return setEditingCoupon(null);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {editingCoupon ? "Update Coupon" : "Create Coupon"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Coupon List Section */}
      <Card className="shadow-md border border-border/50">
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <XCircle className="mx-auto mb-2 h-8 w-8 opacity-60" />
              <p>No coupons available.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell className="font-semibold">{c.code}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 capitalize"
                      >
                        {c.discountType !== DiscountTypeEnum.Percentage && "₦"}
                        {c.discountType === DiscountTypeEnum.Percentage
                          ? c.discountValue
                          : c.discountValue.toLocaleString()}
                        {c.discountType === DiscountTypeEnum.Percentage && "%"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(c.expiresAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {c.usedCount}/{c.usageLimit || "∞"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={c.isActive ? "default" : "outline"}
                        className="capitalize"
                      >
                        {c.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(c)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => confirmDelete(c._id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Coupon</DialogTitle>
            <p className="text-muted-foreground">
              Are you sure you want to delete this coupon? This action cannot be
              undone.
            </p>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
