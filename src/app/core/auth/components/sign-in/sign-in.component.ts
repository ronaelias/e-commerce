// import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.scss']
// })
// export class SignInComponent implements OnInit {
//   signInForm!: FormGroup;
//   returnUrl!: string;
//   error = '';

//   @ViewChild('passwordInput') passwordInput!: ElementRef;
//   @ViewChild('signInButton') signInButton!: ElementRef;

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router
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

//     if(user) {
//       console.log('Sign-in successful');
//       alert('Sign-in successful');
//       localStorage.setItem('token', ''); 
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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.signInForm.controls; }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: { email: string, password: string }) => user.email === email && user.password === password);

    if (user) {
      console.log('Sign-in successful');
      alert('Sign-in successful');
      localStorage.setItem('token', ''); 
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
