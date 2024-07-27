import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess, loadProductsFailure } from './product-listing.action';
import { Product } from '../../../product.model';

export interface ProductListingState {
  products: Product[];
  error: any;
}

export const initialState: ProductListingState = {
  products: [],
  error: null
};

export const productListingReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    products: [],
    error
  }))
);
