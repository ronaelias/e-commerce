import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environment';

import { iSignInRequest } from '../models/sign-in-request.model';
import { iSignInResponse } from '../models/sign-in-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  signIn(req: iSignInRequest): Observable<iSignInResponse> {
    return this.http.post<iSignInResponse>(`${this.authURL}/User/SignIn`, req).pipe(
      map(user => {
        // Store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  signOut() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}


// export class AuthService {
//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;

//   constructor(private http: HttpClient, private router: Router) {
//     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   signIn(email: string, password: string) {
//     return this.http.post<any>('/api/auth/signIn', { email, password })
//       .pipe(map(user => {
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         this.currentUserSubject.next(user);
//         return user;
//       }));
//   }

//   signOut() {
//     // remove user from local storage and set current user to null
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/signIn']);
//   }
// }