import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})

// PRODUCT SERVICE CLASS
export class ProductService {
  // define the base url for the service that we're gonna call
  private baseUrl: string = "http://localhost:8080/api/producs";

  // inject the HttpClient
  constructor(private httpClient: HttpClient) { }

  /**
   * @method getProductList
   * @return Observable of product array
   * Map the JSON data from Spring Data REST to Product array
   */
  getProductList(): Observable<Product[]>{
    // use the http client to make GET req to baseUrl
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      // we're going to use map to map the data to our given data type
      map(response => response._embedded.products) // *products = products array
    );
  }
}

// GET RESPONSE INTERFACE
// supporting interface to help us with mapping
// unwraps the JSON from Spring Data REST _embedded entry
interface GetResponse {
  
  _embedded: {
    products: Product[]
  }
}
