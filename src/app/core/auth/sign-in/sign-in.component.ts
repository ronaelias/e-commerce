import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm = this.fb.group( {
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  
  constructor(private fb: FormBuilder){}
  
  onSubmit() {
    console.warn(this.signInForm.value);
  }
}

// export class SignInComponent {
//     email: string = '';
//     password: string = ''
//   }
  
//   constructor(private signInService: SignInService, private router: Router){}
  
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
// }


