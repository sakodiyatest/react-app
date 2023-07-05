import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TrlListResponse } from '../../services/trlList.service';

interface TrlListState {
  trlList?: TrlListResponse[];
  isLoading: boolean;
  error?: string | null;
}

const initialState: TrlListState = {
  trlList: [],
  isLoading: false,
};

export const trlListSlice = createSlice({
  name: 'trlList',
  initialState,
  reducers: {
    getTrlListFetch: state => {
      state.isLoading = true;
      state.error = null;
    },
    getTrlListSuccess: (state, action: PayloadAction<TrlListResponse[]>) => {
      state.isLoading = false;
      state.error = null;
      state.trlList = action.payload;
    },
    getTrlListFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getTrlListFetch, getTrlListSuccess, getTrlListFail } =
  trlListSlice.actions;
export default trlListSlice.reducer;
