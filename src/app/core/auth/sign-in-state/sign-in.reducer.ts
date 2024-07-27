import { createReducer, on } from '@ngrx/store';

import { SignInApiActions } from './sign-in.action';
import { iSignInRequest } from '../models/sign-in-request.model';

export const initialState: ReadonlyArray<iSignInRequest> = [];

export const signInReducer = createReducer(
  initialState,
  on(SignInApiActions.retrievedSignInList, (_state, { signIn }) => signIn)
);