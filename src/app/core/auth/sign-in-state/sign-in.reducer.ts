// import { createReducer, on } from '@ngrx/store';

// import { SignInApiActions } from './sign-in.action';
// import { iSignInRequest } from '../models/sign-in-request.model';

// export const initialState: ReadonlyArray<iSignInRequest> = [];

// export const signInReducer = createReducer(
//   initialState,
//   on(SignInApiActions.retrievedSignInList, (_state, { signIn }) => signIn)
// );
// import { createReducer, on } from '@ngrx/store';
// import { SignInActions } from './sign-in.action';

// export const initialState: ReadonlyArray<string> = [];

// export const collectionReducer = createReducer(
//   initialState,
//   on(SignInActions.removeSignIn, (state, { signInId }) =>
//     state.filter((id) => id !== signInId)
//   ),
//   on(SignInActions.addSignIn, (state, { signInId }) => {
//     if (state.indexOf(signInId) > -1) return state;

//     return [...state, signInId];
//   })
// );

import { createReducer, on } from '@ngrx/store';
import { signInSuccess, signInFailure } from './sign-in.action';
import { iSignInResponse } from '../models/sign-in-response.model';

export interface SignInState {
  user: iSignInResponse | null;
  error: any;
}

export const initialState: SignInState = {
  user: null,
  error: null,
};

export const signInReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { response }) => ({
    ...state,
    user: response,
    error: null,
  })),
  on(signInFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
