import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import appConfigReducer from './appConfigSlice';
import editProductReducer from './editProductSlice';
import trlListReducer from './trlListSlice';

const rootReducer = combineReducers({
  product: productReducer,
  appConfig: appConfigReducer,
  editProduct: editProductReducer,
  trlList: trlListReducer,
});

export default rootReducer;
