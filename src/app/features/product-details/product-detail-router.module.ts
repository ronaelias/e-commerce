import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductDetailComponent } from './components/product-detail/product-detail.component'

const routes: Routes = [{ path: '', component: ProductDetailComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsDetailRoutingModule {}
