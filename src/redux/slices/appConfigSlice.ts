import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppConfigurationResponse } from '../../services/appConfigurations.service';

interface AppConfigState {
  appConfig?: AppConfigurationResponse;
  isLoading: boolean;
  error?: string | null;
}

const initialState: AppConfigState = {
  isLoading: false,
};

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    getAppConfigFetch: state => {
      state.isLoading = true;
      state.error = null;
    },
    getAppConfigSuccess: (
      state,
      action: PayloadAction<AppConfigurationResponse>,
    ) => {
      state.isLoading = false;
      state.error = null;
      state.appConfig = action.payload;
    },
    getAppConfigFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getAppConfigFail, getAppConfigFetch, getAppConfigSuccess } =
  appConfigSlice.actions;
export default appConfigSlice.reducer;
