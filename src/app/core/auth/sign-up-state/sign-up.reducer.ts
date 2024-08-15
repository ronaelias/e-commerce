import { createReducer, on } from '@ngrx/store';
import { SignUpActions } from './sign-up.action';
import { iSignUpResponse } from '../models/sign-up-response.model';

export interface SignUpState {
  user: iSignUpResponse | null;
  error: any;
}

export const initialState: SignUpState = {
  user:null, 
  error: null,
};

export const signUpReducer = createReducer(
  initialState,
  on(SignUpActions.signUpSuccess, (state, { response }) => ({
    ...state,
    user: response,
    error: null,
  })),
  on(SignUpActions.signUpFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
