import { createActionGroup, props } from '@ngrx/store';
import { iSignInRequest } from '../models/sign-in-request.model';

export const SignInActions = createActionGroup({
  source: 'iSignInRequest',
  events: {
    'Add SignIn': props<{ signInId: string }>(),
    'Remove SignIn': props<{ signInId: string }>(),
  },
});

export const SignInApiActions = createActionGroup({
  source: 'SignIn API',
  events: {
    'Retrieved SignIn List': props<{ signIn: ReadonlyArray<iSignInRequest> }>(),
  },
});