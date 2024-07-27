import { createSelector, createFeatureSelector } from '@ngrx/store';
import { iSignInRequest } from '../models/sign-in-request.model';

export const selectSignIn = createFeatureSelector<ReadonlyArray<iSignInRequest>>('signIn');

export const selectCollectionState = createFeatureSelector<
  ReadonlyArray<string>
>('collection');

export const selectSignInCollection = createSelector(
  selectSignIn,
  selectCollectionState,
  (signIn, collection) => {
    return collection.map((id) => signIn.find((signIn) => signIn.email === id)!);
  }
);