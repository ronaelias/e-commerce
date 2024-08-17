import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  returnUrl!: string;
  error = '';
  
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private store: Store
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //   ngOnInit() {
  //   this.signInForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(8)]]
  //   });

  //   this.store.pipe(select(selectSignInResponse)).subscribe(iSignInResponse => {
  //     if (iSignInResponse) {
  //       this.router.navigate(['/product-listing']);
  //     }
  //   });
  // }

  get f() { return this.signInForm.controls; }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((user: { email: string, password: string }) => user.email === email && user.password === password);

    if (currentUser) {
      console.log('Sign-in successful');
      alert('Sign-in successful');
      //const req: iSignInRequest = { email, password };

      //this.authService.signIn(req);

      // Save the last user's email or any unique identifier to localStorage
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      //localStorage.setItem('lastSignedInUserEmail', currentUser.email);
      localStorage.setItem('Access Token', 'AccessToken'); 
      localStorage.setItem('Refresh Token', 'RefreshToken');
      this.router.navigate([this.returnUrl]);
    } else {
      this.error = 'Invalid email or password';
    } 
  }

  onEmailKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.passwordInput.nativeElement.focus();
    }
  }

  onPasswordKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.signInButton.nativeElement.click();
    }
  }
}

  // ngOnInit() {
  //   this.signInForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(8)]]
  //   });

  //   this.store.pipe(select(selectSignInResponse)).subscribe(iSignInResponse => {
  //     if (iSignInResponse) {
  //       this.router.navigate(['/product-listing']);
  //     }
  //   });
  // }


  // onSubmit() {
    // const iSignInRequest: iSignInRequest = {
    // email: this.signInForm.value.email,
    // password: this.signInForm.value.password
    // }

// export class SignInComponent implements OnInit {

//   onSubmit() {
//     if (this.signInForm.invalid) {
//       return;
//     }

//     const email = this.signInForm.get('email')?.value;
//     const password = this.signInForm.get('password')?.value;

//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find((user: { email: string, password: string }) => user.email === email && user.password === password);

//     if(user) {
//       console.log('Sign-in successful');
//       alert('Sign-in successful');
//       localStorage.setItem('token', ''); 
//       this.router.navigate([this.returnUrl]);
//     } else {
//       this.error = 'Invalid email or password';
//     }
//   }
// }





// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { iSignInResponse } from '../../models/sign-in-response.model';
// import { iSignInRequest } from '../../models/sign-in-request.model';
// import { environment } from '../../environment';

// @Component({
//   selector: 'app-sign-in',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss']
// })
// export class SignInComponent implements OnInit {
//   signInForm!: FormGroup;
//   returnUrl!: string;
//   error = '';

//   @ViewChild('passwordInput') passwordInput!: ElementRef;
//   @ViewChild('signInButton') signInButton!: ElementRef;

//   private authURL = environment.apiUrl;
//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private http: HttpClient,
    
//   ) {}

//   ngOnInit() {
//     this.signInForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]]
//     });

//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }

//   get f() { return this.signInForm.controls; }

//   onSubmit() {
//     if (this.signInForm.invalid) {
//       return;
//     }

//     const email = this.signInForm.get('email')?.value;
//     const password = this.signInForm.get('password')?.value;

//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find((user: { email: string, password: string }) => user.email === email && user.password === password);

//     if (user) {
//       console.log('Local storage credentials matched');

//       this.signIn({ email, password }).subscribe(
//         (response) => {
//           // Handle successful sign-in
//           console.log('Sign-in successful');
//           alert('Sign-in successful');
          
//           localStorage.setItem('accessToken', response.SignIn.AccessToken);
//           localStorage.setItem('refreshToken', response.SignIn.RefreshToken);

//           this.router.navigate([this.returnUrl]);
//         },
//         (error) => {
//           // Handle error
//           console.error('Sign-in error', error);
//           this.error = 'Error fetching tokens from backend';
//         }
//       );
//     } else {
//       this.error = 'Invalid email or password';
//     }
//   }

//   signIn(req: iSignInRequest): Observable<iSignInResponse> {
//     return this.http.post<iSignInResponse>(`${this.authURL}/User/SignIn`, req).pipe(
//       map(res => {
//         // Store user details and token in local storage
//         localStorage.setItem('SignInEmail', req.email);
//         localStorage.setItem('SignInPassword', req.password);
//         localStorage.setItem('accessToken', res.SignIn.AccessToken);
//         localStorage.setItem('refreshToken', res.SignIn.RefreshToken);
//         localStorage.setItem('currentUser', JSON.stringify(res));
//         return res;
//       })
//     );
//   }

//   onEmailKeydown(event: KeyboardEvent) {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       this.passwordInput.nativeElement.focus();
//     }
//   }

//   onPasswordKeydown(event: KeyboardEvent) {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       this.signInButton.nativeElement.click();
//     }
//   }
// }






// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { iSignInRequest } from '../../models/sign-in-request.model';

// @Component({
//   selector: 'app-sign-in',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss']
// })
// export class SignInComponent implements OnInit {
//   signInForm!: FormGroup;
//   returnUrl!: string;
//   error = '';

//   @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
//   @ViewChild('signInButton') signInButton!: ElementRef<HTMLButtonElement>;

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     this.signInForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]]
//     });

//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }

//   get f() { return this.signInForm.controls; }

//   onSubmit() {
//     if (this.signInForm.invalid) {
//       return;
//     }

//     const email = this.signInForm.get('email')?.value;
//     const password = this.signInForm.get('password')?.value;

//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const currentUser = users.find((user: { email: string, password: string }) => user.email === email && user.password === password);

//     if (currentUser) {
//       console.log('Sign-in successful');
//       alert('Sign-in successful');
      
//       // Save the current user's data and tokens to localStorage
//       localStorage.setItem('currentUser', JSON.stringify(currentUser));
//       localStorage.setItem('Access Token', 'AccessToken'); 
//       localStorage.setItem('Refresh Token', 'RefreshToken');

//       // Uncomment to use AuthService for sign-in
//       // const req: iSignInRequest = { email, password };
//       // this.authService.signIn(req);

//       this.router.navigate([this.returnUrl]);
//     } else {
//       this.error = 'Invalid email or password';
//     }
//   }

//   onEmailKeydown(event: KeyboardEvent) {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       this.passwordInput.nativeElement.focus();
//     }
//   }

//   onPasswordKeydown(event: KeyboardEvent) {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       this.signInButton.nativeElement.click();
//     }
//   }
// }
