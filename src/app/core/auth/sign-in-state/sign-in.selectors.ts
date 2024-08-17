import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignInState } from './sign-in.reducer';
import { iSignInResponse } from '../models/sign-in-response.model';

export const selectSignInState = createFeatureSelector<SignInState>('signIn');

// export const selectSignInResponse = createSelector(
//   selectSignInState,
//   (state: SignInState) => state.iSignInResponse
// );

//get user part of state from store
export const selectSignInUser = createSelector(
  selectSignInState,
  (state: SignInState) => state.user
);

export const selectSignInError = createSelector(
  selectSignInState,
  (state: SignInState) => state.error
);
