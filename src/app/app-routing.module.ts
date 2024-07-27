import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product-listing/components/product-list/product-list.component';
import { ProductDetailComponent } from './features/product-details/components/product-detail/product-detail.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProductListingModule } from './features/product-listing/product-listing.module';

const routes: Routes = [
  {path: 'product', component: ProductListComponent},
  { path: 'product-listing', component: ProductListComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'sign-in', component: SignInComponent },
  {path: 'sign-up', component: SignUpComponent},
  { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  { path: 'admin',
    component: AdminComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN',
        redirectTo: '/product-listing'
      }
    }
  },
  { path: '', redirectTo: '/product-listing', pathMatch: 'full' },
  { path: 'product-listing', loadChildren: () => import('./features/product-listing/product-listing.module').then(m => m.ProductListingModule) },
  { path: 'product-details', loadChildren: () => import('./features/product-details/product-details.module').then(m => m.ProductDetailsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
