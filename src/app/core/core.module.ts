import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SignInComponent } from './auth/components/sign-in/sign-in.component'
import { SignUpComponent } from './auth/components/sign-up/sign-up.component'
import { AuthService } from './auth/services/auth.service'

@NgModule({
  declarations: [SignUpComponent],
  imports: [SignInComponent, CommonModule],
  exports: [SignInComponent, SignUpComponent],
  providers: [AuthService],
})
export class CoreModule {}
