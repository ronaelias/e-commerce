import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './core/app-shell/navbar/navbar.component'
import { FooterComponent } from './core/app-shell/footer/footer.component'
import { ProductDetailComponent } from './features/product-details/components/product-detail/product-detail.component'
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component'
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { ProductListComponent } from './features/product-listing/components/product-list/product-list.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AuthInterceptor } from './core/auth/interceptors/auth.interceptor'
import { AuthService } from './core/auth/services/auth.service'
import { AuthGuard } from './core/auth/guards/auth.guard'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ErrorInterceptor } from './core/auth/interceptors/error.interceptor'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { NgxPermissionsModule } from 'ngx-permissions'
import { AdminComponent } from './features/admin/admin.component'
import { WelcomeMessagePipe } from './shared/pipes/welcome-message.pipe'
import { MatInputModule } from '@angular/material/input'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { AgGridModule } from 'ag-grid-angular'
import { DeleteButtonRendererComponent } from './shared/components/delete-button-renderer/delete-button-renderer.component'
import {
  GridModule,
  PagerModule,
  FilterService,
} from '@syncfusion/ej2-angular-grids'
import { ModuleRegistry } from '@ag-grid-community/core'
import { MenuModule } from '@ag-grid-enterprise/menu'
import { SetFilterModule } from '@ag-grid-enterprise/set-filter'
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel'
import { CategoryComponent } from './features/category/category.component'
import { ProductCardComponent } from './shared/components/products-card/product-card.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ProductDetailCardComponent } from './shared/components/product-detail-card/product-detail-card.component'
import { FeaturesModule } from './features/features.module'
import { FavoriteComponent } from './features/favorite/favorite.component'
import { FavoriteButtonComponent } from './shared/components/favorite-button/favorite-button.component'
import { CartComponent } from './features/cart/cart.component'

ModuleRegistry.registerModules([
  MenuModule,
  SetFilterModule,
  FiltersToolPanelModule,
])

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProductDetailComponent,
    ProductDetailCardComponent,
    ProductCardComponent,
    SignUpComponent,
    ProductListComponent,
    AdminComponent,
    WelcomeMessagePipe,
    DeleteButtonRendererComponent,
    CategoryComponent,
    FavoriteComponent,
    FavoriteButtonComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    NgxPermissionsModule.forRoot(),
    MatInputModule,
    SignInComponent,
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    GridModule,
    PagerModule,
    MatDatepickerModule,
    FeaturesModule,
  ],
  exports: [ProductCardComponent],
  providers: [
    FilterService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
