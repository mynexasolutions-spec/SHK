"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  minSpend?: number;
  description: string;
}

const VALID_COUPONS: Coupon[] = [
  {
    code: "GARAGE10",
    type: "percent",
    value: 10,
    minSpend: 2000,
    description: "10% off for verified garage orders over ₹2,000",
  },
  {
    code: "SHKFIRST",
    type: "fixed",
    value: 150,
    minSpend: 999,
    description: "₹150 off on first purchase above ₹999",
  },
  {
    code: "BULK20",
    type: "percent",
    value: 20,
    minSpend: 10000,
    description: "20% off for bulk wholesale orders over ₹10,000",
  },
];

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  shippingFee: number;
  taxAmount: number;
  grandTotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shk_cart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        } catch {
          localStorage.removeItem("shk_cart");
        }
      }

      const savedWishlist = localStorage.getItem("shk_wishlist");
      if (savedWishlist) {
        try {
          const parsed = JSON.parse(savedWishlist);
          if (Array.isArray(parsed)) {
            setWishlist(parsed);
          }
        } catch {
          localStorage.removeItem("shk_wishlist");
        }
      }

      const savedCoupon = localStorage.getItem("shk_coupon");
      if (savedCoupon) {
        try {
          const parsed = JSON.parse(savedCoupon);
          if (parsed && typeof parsed === "object") {
            setAppliedCoupon(parsed);
          }
        } catch {
          localStorage.removeItem("shk_coupon");
        }
      }
    } catch {
      // Ignore local storage error
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("shk_cart", JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items, mounted]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("shk_wishlist", JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist, mounted]);

  // Save coupon
  useEffect(() => {
    if (!mounted) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem("shk_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("shk_coupon");
      }
    } catch {
      // Ignore
    }
  }, [appliedCoupon, mounted]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(product.stock, i.quantity + quantity) }
            : i
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(i.product.stock, quantity) }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Totals calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal taking into account any wholesale tier pricing per line item!
  const subtotal = items.reduce((sum, item) => {
    const qty = item.quantity;
    // Check wholesale tier
    let unitPrice = item.product.price;
    const applicableTier = [...item.product.wholesaleTiers]
      .sort((a, b) => b.minQty - a.minQty)
      .find((tier) => qty >= tier.minQty);

    if (applicableTier) {
      unitPrice = applicableTier.pricePerUnit;
    }

    return sum + unitPrice * qty;
  }, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.minSpend && subtotal < appliedCoupon.minSpend) {
      // coupon spend requirement not met
    } else if (appliedCoupon.type === "percent") {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  // Free shipping over ₹999, else ₹99
  const shippingFee = subtotal > 999 || items.length === 0 ? 0 : 99;

  // Automotive parts GST 18% (included in transparent breakdown)
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round((taxableAmount * 18) / 118); // GST included component

  const grandTotal = taxableAmount + shippingFee;

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === formatted);

    if (!found) {
      return { success: false, message: "Invalid promo code. Try 'GARAGE10' or 'SHKFIRST'." };
    }

    if (found.minSpend && subtotal < found.minSpend) {
      return {
        success: false,
        message: `Code requires minimum order value of ₹${found.minSpend.toLocaleString("en-IN")}.`,
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon '${found.code}' applied successfully!` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        itemCount,
        subtotal,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingFee,
        taxAmount,
        grandTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        openWishlist,
        closeWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

