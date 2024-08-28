import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { iSignInRequest } from '../../models/sign-in-request.model'
import { selectSignInResponse } from '../../states/sign-in-state/sign-in.selectors'
import { signIn } from '../../states/sign-in-state/sign-in.action'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup
  errorMessage: string | null = null

  @ViewChild('passwordInput') passwordInput!: ElementRef
  @ViewChild('signInButton') signInButton!: ElementRef

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      Username: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
    })
    this.store.pipe(select(selectSignInResponse)).subscribe((signInRequest) => {
      if (signInRequest) {
        //this.router.navigate(['product-listing'])
      }
    })
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const signInRequest: iSignInRequest = {
        Username: this.signInForm.value.Username,
        Password: this.signInForm.value.Password,
      }
      this.store.dispatch(signIn({ signInRequest }))
    } else {
      alert('Incorrect email or password')
    }
  }

  askForAdminCode(event: Event): void {
    event.preventDefault()

    const code = prompt('Enter admin code:')

    if (code === 'secretcode') {
      this.router.navigate(['/admin'])
    } else {
      alert('Incorrect code.')
    }
  }

  onEmailKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.passwordInput.nativeElement.focus()
    }
  }

  onPasswordKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.signInButton.nativeElement.click()
    }
  }
}
