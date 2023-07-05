import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProductData {
  name: string;
  description: string;
  video: string;
  productId?: string;
  trl: string;
  investmentEffort: string;
  categories: Array<{ id?: number; name: string }>;
  businessModels: Array<{ id?: number; name: string }>;
}

interface EditProductState {
  isLoading: boolean;
  error?: string | null;
}

const initialState: EditProductState = {
  isLoading: false,
};

export const editProductSlice = createSlice({
  name: 'editProduct',
  initialState,
  reducers: {
    updateProductDetail: (state, action: PayloadAction<ProductData>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProductDetailSuccess: state => {
      state.isLoading = false;
      state.error = null;
    },
    updateProductDetailFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  updateProductDetail,
  updateProductDetailSuccess,
  updateProductDetailFail,
} = editProductSlice.actions;
export default editProductSlice.reducer;
