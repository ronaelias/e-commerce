import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['/product-listing'] || '/';
  }

  get f() { return this.signInForm.controls; }

  onSubmit() {
    if (this.signInForm.invalid) {
      return;
    }

    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
    
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    // for debugging
    console.log('Saved Email:', savedEmail);
    console.log('Saved Password:', savedPassword);

    // const user = {
    //   email: this.signInForm.value.email,
    //   role: this.signInForm.value.email === 'admin@example.com' ? 'ADMIN' : 'USER'
    // };

    // this.authService.setPermissions();
    // this.authService.setRole(user.role);
    // this.router.navigate(['/product-listing']);

    

  //   if (email === savedEmail && password === savedPassword) {
  //     this.authService.signIn({ email, password })
  //       .subscribe(
  //         data => {
  //           console.log('Sign In successful');
  //           alert('Sign In successful');
  //           this.router.navigate([this.returnUrl]);
  //         },
  //         error => {
  //           console.error(error);
  //           this.error = 'Sign In failed';
  //         }
  //       );
  //   } else {
  //     this.error = 'Invalid email or password';
  //   }
  // }

        this.authService.signIn({email, password}).subscribe(response => {
          if (response && response.SignIn && response.SignIn.AccessToken) {
            console.log('Login successful');
            alert('Login successful');
            localStorage.setItem('token', response.SignIn.AccessToken);
            this.router.navigate(['/']);
          }
        })
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

// export class SignInComponent {
//   signInForm = this.fb.group( {
//     email: ['', Validators.required],
//     password: ['', Validators.required]
//   })
  
//   constructor(private fb: FormBuilder){}
  
//   onSubmit() {
//     console.warn(this.signInForm.value);
//   }
// }

// export class SignInComponent {
//     email: string = '';
//     password: string = ''
//   }
  
//   constructor(private AuthService: SignInService, private router: Router){}
  
//   onSubmit(): void {
//     this.signInService.signIn(this.email, this.password).subscribe(response => {
//       if (response && response.SignIn && response.SignIn.AccessToken) {
//         console.log('Login successful');
//         alert('Login successful');
//         localStorage.setItem('token', response.SignIn.AccessToken);
//         this.router.navigate(['/']);
//       }
//     })
//   }