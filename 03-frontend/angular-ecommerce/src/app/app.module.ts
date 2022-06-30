import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

// WHENEVER WE WANT TO ADD ROUTE, ALWAYS ADD IT IN APP.MODULE.TS

// step1: define routes
const routes: Routes = [
  /**
   * path:"**" is the path to match, 
   * when matched, create a new instance of component (ProductListComponent)
   * component: ProductListComponent -> this route will also be handled by ProductListComponent
   */

  // route for searching product
  {path: "search/:keyword", component: ProductListComponent},
  // route for returning individual product 
  {path: "products/:id", component: ProductDetailsComponent},
  // route for returning product based on category
  {path: "category/:id/:name", component: ProductListComponent},
  {path: "category", component: ProductListComponent},
  {path: "products", component: ProductListComponent},
  {path: "", redirectTo: "/products", pathMatch: "full"}, // if empty path
  {path: "**", redirectTo: "/products", pathMatch: "full"} // generic wildcard

  
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes), // step2: configure router based on our routes
    BrowserModule,
    HttpClientModule, // need to import module for http client module
    NgbModule // import ng-bootstrap
  ],
  providers: [ProductService], //  add a reference to ProductService (allows us to inject that given service into other part of the application)
  bootstrap: [AppComponent]
})
export class AppModule { }
