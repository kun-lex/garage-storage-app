// store/ProductSlice.ts
import { StateCreator } from "zustand";

export type Product = {
  id: string;
  name: string;
  rating?: number;
  reviewCount?: number;
  priceFrom: string;
  pricePerAdult?: boolean;
  location: string;
  imageSource: { uri: string };
};

export interface ProductSlice {
  likedProducts: Product[];
  toggleLike: (product: Product) => void;
  isLiked: (id: string) => boolean;
}

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
  likedProducts: [],

  toggleLike: (product) => {
    const { likedProducts } = get();
    const exists = likedProducts.some((p) => p.id === product.id);

    if (exists) {
      set({
        likedProducts: likedProducts.filter((p) => p.id !== product.id),
      });
    } else {
      set({
        likedProducts: [...likedProducts, product],
      });
    }
  },

  isLiked: (id) => {
    return get().likedProducts.some((p) => p.id === id);
  },
});
