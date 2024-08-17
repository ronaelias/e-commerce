import { createActionGroup, props } from '@ngrx/store'
import { iSignUpRequest } from '../models/sign-up-request.model'
import { iSignUpResponse } from '../models/sign-up-response.model'

export const SignUpActions = createActionGroup({
  source: 'Sign Up',
  events: {
    'Sign Up': props<{ request: iSignUpRequest }>(),
    'Sign Up Success': props<{ response: iSignUpResponse }>(),
    'Sign Up Failure': props<{ error: any }>(),
  },
})
