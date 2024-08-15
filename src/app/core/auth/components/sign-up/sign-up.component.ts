import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  @ViewChild('surnameInput') surnameInput!: ElementRef;
  @ViewChild('dobInput') dobInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('paymentMethodInput') paymentMethodInput!: ElementRef;
  @ViewChild('countryInput') countryInput!: ElementRef;
  @ViewChild('telephoneInput') telephoneInput!: ElementRef;
  @ViewChild('regionInput') regionInput!: ElementRef;
  @ViewChild('cityInput') cityInput!: ElementRef;
  @ViewChild('streetAndNumberInput') streetAndNumberInput!: ElementRef;
  @ViewChild('stairwayAndFloorInput') stairwayAndFloorInput!: ElementRef;
  @ViewChild('signUpButton') signUpButton!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router) {
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
    const user = this.signUpForm.value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);

    // Save users array in localStorage
    localStorage.setItem('users', JSON.stringify(users));

    const name = this.signUpForm.get('name')?.value;
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    // Save name, email and password in localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    console.warn(this.signUpForm.value);
    alert('Sign Up successful');
    this.router.navigate(['/product-listing']);
  }

  get f() { return this.signUpForm.controls; }

  onKeydown(event: KeyboardEvent, nextInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault();
      nextInput.focus();
    }
  }

  onLastKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.signUpButton.nativeElement.click();
    }
  }
}
