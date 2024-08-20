import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SignInState } from './sign-in.reducer'
import { iSignInResponse } from '../models/sign-in-response.model'

export const selectSignInState = createFeatureSelector<SignInState>('signIn')

export const selectSignInResponse = createSelector(
  selectSignInState,
  (state: SignInState) => state.response
)

//get email part of state from store
export const selectSignInEmail = createSelector(
  selectSignInState,
  (state: SignInState) => state.Username
)

export const selectSignInError = createSelector(
  selectSignInState,
  (state: SignInState) => state.error
)

// export const selectAccessToken = createSelector(
//   selectSignInState,
//   (response) => response?.SignIn?.AccessToken || null
// )
