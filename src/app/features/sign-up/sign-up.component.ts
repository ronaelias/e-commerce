import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUpComponent {
  signUpForm = this.fb.group( {
    name: ['', Validators.required],
    surname: ['', Validators.required],
    dob: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    country: ['', Validators.required],
    telephone: ['', Validators.required],
    streetAndNumber: ['', Validators.required],
    stairwayAndFloor: [''],
    region: ['', Validators.required],
    city: ['', Validators.required],
  })
  
  constructor(private fb: FormBuilder){}
  
  onSubmit() {
    console.warn(this.signUpForm.value);
  }
}
