import { createActionGroup, props } from '@ngrx/store'
import { iSignInRequest } from '../models/sign-in-request.model'
import { iSignInResponse } from '../models/sign-in-response.model'

export const SignInActions = createActionGroup({
  source: 'Sign In',
  events: {
    'Sign In': props<{ request: iSignInRequest }>(),
    'Sign In Success': props<{ response: iSignInResponse }>(),
    'Sign In Failure': props<{ error: any }>(),
  },
})
