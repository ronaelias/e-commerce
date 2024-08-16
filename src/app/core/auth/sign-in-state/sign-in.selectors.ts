import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignInState } from './sign-in.reducer';

export const selectSignInState = createFeatureSelector<SignInState>('auth');

//get user part of state from store
export const selectSignInUser = createSelector(
  selectSignInState,
  (state: SignInState) => state.user
);

export const selectSignInError = createSelector(
  selectSignInState,
  (state: SignInState) => state.error
);
