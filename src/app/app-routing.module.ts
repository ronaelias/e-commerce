import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product-listing/components/product-list/product-list.component';
import { ProductDetailComponent } from './features/product-details/components/product-detail/product-detail.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {path: 'product', component: ProductListComponent},
  { path: 'product-listing', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'sign-in', component: SignInComponent },
  {path: 'sign-up', component: SignUpComponent},
  { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
