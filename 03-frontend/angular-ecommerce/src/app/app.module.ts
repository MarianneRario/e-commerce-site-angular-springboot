import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // need to import module for http client module
  ],
  providers: [ProductService], //  add a reference to ProductService (allows us to inject that given service into other part of the application)
  bootstrap: [AppComponent]
})
export class AppModule { }
