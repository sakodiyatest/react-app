/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

export const APP_CONFIGURATION_ID = Number(
  process.env.REACT_APP_APP_CONFIGURATION_ID || 2,
);
export const TIME_OUT_IN_SECONDS = Number(
  process.env.REACT_APP_TIME_OUT_IN_SECONDS || 25,
);
export const CORS_PROXY =
  process.env.REACT_APP_CORS_PROXY || 'https://cors-new.onrender.com';
export const PRODUCT_ID = process.env.REACT_APP_PRODUCT_ID || '6781';
