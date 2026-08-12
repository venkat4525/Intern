"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  category?: string;
  unit?: string;
};

type CartValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  discount: number;
  appliedCoupon: string | null;
  add: (item: { id: string; name: string; price: number; image?: string; category?: string; unit?: string }, qty?: number) => void;
  change: (id: string, delta: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
};

const CartCtx = createContext<CartValue | null>(null);

const STORAGE_KEY = "carebridge_cart_items";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [items, isLoaded]);

  const showNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => {
      setNotification((curr) => (curr === text ? null : curr));
    }, 3000);
  };

  const add = (
    item: { id: string; name: string; price: number; image?: string; category?: string; unit?: string },
    qtyToAdd: number = 1
  ) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + qtyToAdd } : x
        );
      }
      return [...prev, { ...item, qty: qtyToAdd }];
    });
    showNotification(`Added "${item.name}" to cart!`);
  };

  const change = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty + delta } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) {
      remove(id);
      return;
    }
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty } : x)));
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    showNotification("Item removed from cart");
  };

  const clear = () => {
    setItems([]);
    setAppliedCoupon(null);
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "CARE10") {
      setAppliedCoupon("CARE10");
      setDiscountPercent(10);
      return { success: true, message: "10% Discount applied!" };
    } else if (clean === "WELCOME100") {
      setAppliedCoupon("WELCOME100");
      setDiscountPercent(15);
      return { success: true, message: "15% Welcome discount applied!" };
    }
    return { success: false, message: "Invalid coupon code" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
  };

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const discount = useMemo(
    () => Math.round((subtotal * discountPercent) / 100),
    [subtotal, discountPercent]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      discount,
      appliedCoupon,
      add,
      change,
      setQty,
      remove,
      clear,
      applyCoupon,
      removeCoupon,
      notification,
      setNotification,
    }),
    [items, count, subtotal, discount, appliedCoupon, notification]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const context = useContext(CartCtx);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
