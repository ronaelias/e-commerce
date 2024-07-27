import { createAction, props } from '@ngrx/store';
import { Product } from '../../../product.model';

export const loadProducts = createAction(
  'Load Products'
);

export const loadProductsSuccess = createAction(
  'Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  'Load Products Failure',
  props<{ error: any }>()
);
