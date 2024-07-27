import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { signUp, signUpSuccess, signUpFailure } from './sign-up.action';

@Injectable()
export class SignUpEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      mergeMap(action =>
        this.authService.signUp(action.request).pipe(
          map(response => signUpSuccess({ response })),
          catchError(error => of(signUpFailure({ error })))
        )
      )
    )
  );
}
