import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environmentAuth } from '../../../../environments/environmentAuth'
import { iSignInRequest } from '../models/sign-in-request.model'
import { iSignInResponse } from '../models/sign-in-response.model'
import { iSignUpRequest } from '../models/sign-up-request.model'
import { iSignUpResponse } from '../models/sign-up-response.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL = environmentAuth.apiUrl

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signUp(signUpRequest: iSignUpRequest): Observable<iSignUpResponse> {
    return this.http
      .post<iSignUpResponse>(`${this.authURL}/SignUp()`, signUpRequest)
      .pipe(
        tap((response) => {
          localStorage.setItem('Firstname', signUpRequest.Firstname)
          localStorage.setItem('Lastname', signUpRequest.Lastname)
          localStorage.setItem('Email', signUpRequest.Email)
          localStorage.setItem('Password', signUpRequest.Password)
          // const roles = isAdminn ? ['ADMIN] : ['USER]
          // this.permissionsService.loadPermissions(roles);
        })
      )
  }

  signIn(signInRequest: iSignInRequest): Observable<iSignInResponse> {
    return this.http
      .post<iSignInResponse>(`${this.authURL}/Login()`, signInRequest)
      .pipe(
        tap((response) => {
          localStorage.setItem('Email', signInRequest.Username)
          localStorage.setItem('Password', signInRequest.Password)

          localStorage.setItem('AccessToken', response.Login.AccessToken)
          localStorage.setItem('RefreshToken', response.Login.RefreshToken)

          //const roles = response.SinIn.Scope.split('');
          //this.permissionService.loadPermissions(roles);
        })
      )
  }

  signOut() {
    localStorage.removeItem('Firstname')
    localStorage.removeItem('Lastname')
    localStorage.removeItem('Email')
    localStorage.removeItem('Password')
    localStorage.removeItem('AccessToken')
    localStorage.removeItem('RefreshToken')
    this.router.navigate(['/sign-in/sign-up'])
    //this.permissionService.flushPermissions();
  }

  isSignedIn(): boolean {
    return localStorage.getItem('Email') !== null
  }

  // setPermissions() {
  //   const permissions = ['USER', 'ADMIN'];
  //   this.permissionsService.loadPermissions(permissions);
  // }

  // setRole(role: string) {
  //   this.permissionsService.addPermission(role);
  // }
}
