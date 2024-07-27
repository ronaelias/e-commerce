import { createReducer, on } from '@ngrx/store';
import { SignInActions } from './sign-in.action';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  on(SignInActions.removeSignIn, (state, { signInId }) =>
    state.filter((id) => id !== signInId)
  ),
  on(SignInActions.addSignIn, (state, { signInId }) => {
    if (state.indexOf(signInId) > -1) return state;

    return [...state, signInId];
  })
);