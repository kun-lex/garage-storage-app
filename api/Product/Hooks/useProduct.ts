// store/useProduct.ts
import { create } from "zustand";
import { createProductSlice, ProductSlice } from "../Actions/ProductSlice";

export const useProduct = create<ProductSlice>()((...a) => ({
  ...createProductSlice(...a),
}));
