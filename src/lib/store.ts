import { useSyncExternalStore, useCallback } from "react";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

interface State {
  cart: CartItem[];
  wishlist: string[];
}

let state: State = { cart: [], wishlist: [] };
const listeners = new Set<() => void>();

function emit() {
  state = { ...state };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const getSnapshot = () => state;
const getServerSnapshot = () => state;

export function useCart() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addToCart = useCallback((product: Product, opts?: { color?: string; size?: string; quantity?: number }) => {
    const qty = opts?.quantity ?? 1;
    const existing = state.cart.find(
      (i) => i.product.id === product.id && i.color === opts?.color && i.size === opts?.size
    );
    if (existing) {
      existing.quantity += qty;
      state.cart = [...state.cart];
    } else {
      state.cart = [...state.cart, { product, quantity: qty, color: opts?.color, size: opts?.size }];
    }
    emit();
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    state.cart = state.cart.filter((i) => i.product.id !== productId);
    emit();
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      state.cart = state.cart.filter((i) => i.product.id !== productId);
    } else {
      state.cart = state.cart.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i));
    }
    emit();
  }, []);

  const clearCart = useCallback(() => {
    state.cart = [];
    emit();
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    state.wishlist = state.wishlist.includes(productId)
      ? state.wishlist.filter((id) => id !== productId)
      : [...state.wishlist, productId];
    emit();
  }, []);

  const subtotal = s.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = s.cart.reduce((n, i) => n + i.quantity, 0);

  return {
    items: s.cart,
    wishlist: s.wishlist,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    subtotal,
    count,
  };
}
