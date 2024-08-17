// signIn(req: iSignInRequest): Observable<iSignInResponse> {
//     return this.http.post<iSignInResponse>(`${this.authURL}/User/SignIn`, req).pipe(
//       map(res => {
//         // Store user details and token in local storage
//         localStorage.setItem('SignInEmail', req.email);
//         localStorage.setItem('Signem('currentUser', JSON.stringify(res));
//         this.currentUserRefreInPassword', req.password);

//         localStorage.setItem('AcessToken', res.SignIn.AccessToken);
//         localStorage.setItem('RefreshToken', res.SignIn.RefreshToken);

//         localStorage.setISubject.next(res);
//         return res;
//       })
//     );
//   }

import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'
import { SignInActions } from './sign-in.action'

@Injectable()
export class SignInEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  //listens for actions
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignInActions.signIn),
      mergeMap((action) =>
        this.authService.signIn(action.request).pipe(
          map((response) => SignInActions.signInSuccess({ response })),
          catchError((error) => of(SignInActions.signInFailure({ error })))
        )
      )
    )
  )
}
