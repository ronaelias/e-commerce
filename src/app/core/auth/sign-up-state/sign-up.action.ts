import { createAction, props } from '@ngrx/store';
import { iSignUpRequest } from '../models/sign-up-request.model';
import { iSignUpResponse } from '../models/sign-up-response.model';

export const signUp = createAction(
  'Sign Up',
  props<{ request: iSignUpRequest }>()
);

export const signUpSuccess = createAction(
  'Sign Up Success',
  props<{ response: iSignUpResponse }>()
);

export const signUpFailure = createAction(
  'Sign Up Failure',
  props<{ error: any }>()
);
