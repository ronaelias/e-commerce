import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

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
