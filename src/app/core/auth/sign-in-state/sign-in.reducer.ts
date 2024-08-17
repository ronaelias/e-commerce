import { createReducer, on } from '@ngrx/store';
import { SignInActions } from './sign-in.action';
import { iSignInResponse } from '../models/sign-in-response.model';

export interface SignInState {
  [x: string]: any;
  user: iSignInResponse | null;
  error: any;
}

export const initialState: SignInState = {
  user: null,
  error: null,
};

export const signInReducer = createReducer(
  initialState,
  on(SignInActions.signInSuccess, (state, { response }) => ({
    //copy current state
    ...state,
    user: response,
    error: null,
  })),
  on(SignInActions.signInFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
