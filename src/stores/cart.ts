import { create } from "zustand";

type Product = {
  id: number;
  price: number;
  discount: number;
  name: string;
  description: string;
  brand: string;
};

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      // if item exists, replace quantity
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id ? { ...item, quantity } : item
          ),
        };
      }

      return { cart: [...state.cart, { product, quantity }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),

  clearCart: () => set(() => ({ cart: [] })),

  getTotalItems: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),
}));
