import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';

// step1: define routes
const routes: Routes = [
  /**
   * path:"**" is the path to match, 
   * when matched, create a new instance of component (ProductListComponent)
   */
  {path: "category/:id", component: ProductListComponent},
  {path: "category", component: ProductListComponent},
  {path: "products", component: ProductListComponent},
  {path: "", redirectTo: "/products", pathMatch: "full"}, // if empty path
  {path: "**", redirectTo: "/products", pathMatch: "full"}, // generic wildcard
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forRoot(routes), // step2: configure router based on our routes
    BrowserModule,
    HttpClientModule // need to import module for http client module
  ],
  providers: [ProductService], //  add a reference to ProductService (allows us to inject that given service into other part of the application)
  bootstrap: [AppComponent]
})
export class AppModule { }
