import { Component, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { iSignUpRequest } from '../../models/sign-up-request.model'
import { signUp } from '../../states/sign-up-state/sign-up.action'
import { IndexedDBService } from '../../../../shared/services/indexed-db.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm!: FormGroup

  @ViewChild('lastnameInput') lastnameInput!: ElementRef
  @ViewChild('emailInput') emailInput!: ElementRef
  @ViewChild('passwordInput') passwordInput!: ElementRef
  @ViewChild('signUpButton') signUpButton!: ElementRef

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const signUpRequest: iSignUpRequest = {
        Firstname: this.signUpForm.value.Firstname,
        Lastname: this.signUpForm.value.Lastname,
        Email: this.signUpForm.value.Email,
        Password: this.signUpForm.value.Password,
        Rolename: 'rolename',
      }
      this.store.dispatch(signUp({ signUpRequest }))
    }
  }

  onKeydown(event: KeyboardEvent, nextInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault()
      nextInput.focus()
    }
  }

  onLastKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.signUpButton.nativeElement.click()
    }
  }
}
