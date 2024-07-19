import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      paymentMethod: ['', Validators.required],
      country: ['', Validators.required],
      telephone: ['', Validators.required],
      streetAndNumber: ['', Validators.required],
      stairwayAndFloor: [''],
      region: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    // Save email and password in localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    console.warn(this.signUpForm.value);
    alert('Sign Up successful');
  }
}
