// // import { createActionGroup, props } from '@ngrx/store';
// // import { iSignInRequest } from '../models/sign-in-request.model';

// // export const SignInActions = createActionGroup({
// //   source: 'iSignInRequest',
// //   events: {
// //     'Add SignIn': props<{ signInId: string }>(),
// //     'Remove SignIn': props<{ signInId: string }>(),
// //   },
// // });

// // export const SignInApiActions = createActionGroup({
// //   source: 'SignIn API',
// //   events: {
// //     'Retrieved SignIn List': props<{ signIn: ReadonlyArray<iSignInRequest> }>(),
// //   },
// // });

// import { createAction, props } from '@ngrx/store';
// import { iSignInRequest } from '../models/sign-in-request.model';
// import { iSignInResponse } from '../models/sign-in-response.model';

// export const signIn = createAction(
//   'Sign In',
//   props<{ request: iSignInRequest }>()
// );

// export const signInSuccess = createAction(
//   'Sign In Success',
//   props<{ response: iSignInResponse }>()
// );

// export const signInFailure = createAction(
//   'Sign In Failure',
//   props<{ error: any }>()
// );
import { createActionGroup, props } from '@ngrx/store';
import { iSignInRequest } from '../models/sign-in-request.model';
import { iSignInResponse } from '../models/sign-in-response.model';

export const SignInActions = createActionGroup({
  source: 'Sign In',
  events: {
    'Sign In': props<{ request: iSignInRequest }>(),
    'Sign In Success': props<{ response: iSignInResponse }>(),
    'Sign In Failure': props<{ error: any }>()
  }
});
