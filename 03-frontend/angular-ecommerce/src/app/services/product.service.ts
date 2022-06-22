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
  private baseUrl: string = "http://localhost:8080/api/products"; //add "?size=100" to return 100 products on the query page

  // inject the HttpClient (create an instance of http client)
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
/**
 * NOTES:
 * Pipes let you combine multiple functions into a single function.
 * 
 * _embedded resources will typically be described as properties of the resource, and point to the mediatype relevant to the embedded resource.
 *
 * _embedded is part of HAL format: https://stackoverflow.com/questions/27405637/meaning-and-usage-of-embedded-in-hateoas/27424771
 *
 * Here's a discussion on this topic: https://www.udemy.com/course/full-stack-angular-spring-boot-tutorial/learn/lecture/18155984#questions/8925982
 * 
 * 
 * Q: I wanna know the reason of using this interface on product.service.ts
 * A: We use this to map the REST API JSON results to an array of Product objects in TypeScript.
 * 
 */
