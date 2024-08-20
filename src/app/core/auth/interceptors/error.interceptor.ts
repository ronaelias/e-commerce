import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert('Incorrect email or password!')
          //this.authService.signOut()
        }

        if (error.status === 500) {
          alert('Email already used, Try another one')
          //this.authService.signOut()
        }

        const errorMessage = error.error.message || error.statusText
        return throwError(errorMessage)
      })
    )
  }
}
