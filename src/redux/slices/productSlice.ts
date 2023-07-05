import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductDetailResponse } from '../../services/product.service';

interface ProductState {
  productDetail?: ProductDetailResponse;
  isLoading: boolean;
  error?: string | null;
}

const initialState: ProductState = {
  isLoading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductDetailFetch: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    getProductDetailSuccess: (
      state,
      action: PayloadAction<ProductDetailResponse>,
    ) => {
      state.isLoading = false;
      state.error = null;
      state.productDetail = action.payload;
    },
    getProductDetailFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getProductDetailFetch,
  getProductDetailSuccess,
  getProductDetailFail,
} = productSlice.actions;
export default productSlice.reducer;
