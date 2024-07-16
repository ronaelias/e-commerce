import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product-listing/components/product-list/product-list.component';
import { SignInComponent } from './core/auth/sign-in/sign-in.component';
import { SignUpComponent } from './core/auth/sign-up/sign-up.component';

const routes: Routes = [
  {path: 'product', component: ProductListComponent},
  { path: 'product-listing', component: ProductListComponent },
  { path: 'sign-in', component: SignInComponent },
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
