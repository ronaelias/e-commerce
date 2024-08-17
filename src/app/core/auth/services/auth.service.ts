import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { environment } from '../../../../environments/environment'
import { iSignInRequest } from '../models/sign-in-request.model'
import { iSignInResponse } from '../models/sign-in-response.model'
import { iSignUpRequest } from '../models/sign-up-request.model'
import { iSignUpResponse } from '../models/sign-up-response.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL = environment.apiUrl
  //hold current user state
  private currentUserSubject: BehaviorSubject<any>
  //expose current user state to other parts of application
  public currentUser: Observable<any>

  constructor(
    private http: HttpClient,
    private router: Router
    // private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    )
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value
  }

  signUp(req: iSignUpRequest): Observable<iSignUpResponse> {
    return this.http
      .post<iSignUpResponse>(`${this.authURL}/User/SignUp`, req)
      .pipe(
        map((res) => {
          // Store user details in local storage
          localStorage.setItem('SignInEmail', req.email)
          localStorage.setItem('SignInPassword', req.password)

          localStorage.setItem('currentUser', JSON.stringify(res))
          this.currentUserSubject.next(res)
          return res
        })
      )
  }

  signIn(req: iSignInRequest): Observable<iSignInResponse> {
    return this.http
      .post<iSignInResponse>(`${this.authURL}/User/SignIn`, req)
      .pipe(
        map((res) => {
          // Store user details and token in local storage
          localStorage.setItem('SignInEmail', req.email)
          localStorage.setItem('SignInPassword', req.password)

          localStorage.setItem('AcessToken', res.SignIn.AccessToken)
          localStorage.setItem('RefreshToken', res.SignIn.RefreshToken)

          localStorage.setItem('currentUser', JSON.stringify(res))
          this.currentUserSubject.next(res)
          return res
        })
      )
  }

  signOut() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
    this.router.navigate(['/login'])
  }

  getAuthToken(): string | null {
    return localStorage.getItem('AccessToken')
  }

  // setPermissions() {
  //   const permissions = ['USER', 'ADMIN'];
  //   this.permissionsService.loadPermissions(permissions);
  // }

  // setRole(role: string) {
  //   this.permissionsService.addPermission(role);
  // }
}
