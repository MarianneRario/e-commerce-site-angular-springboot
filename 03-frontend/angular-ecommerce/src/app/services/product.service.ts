import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category'

@Injectable({
  providedIn: 'root'
})

// PRODUCT SERVICE CLASS
export class ProductService {
  // "http://localhost:8080/api/products?size=100" to return 100 products on the query page
  // define the base url for the service that we're gonna call
  private baseUrl: string = "http://localhost:8080/api/products"; 

  // category url
  private categoryUrl: string = "http://localhost:8080/api/product-category";

  // inject the HttpClient (create an instance of http client)
  constructor(private httpClient: HttpClient) { } 

  /**
   * @method getProductList
   * @return Observable of product array
   * Map the JSON data from Spring Data REST to Product array
   */
  
  getProductList(categoryId: number): Observable<Product[]>{

    // step7: build URL based on category id
    const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    // use the http client to make GET req to baseUrl
    return this.getProducts(searchURL);
    
  }

  // searchProducts method
  searchProducts(theKeyword: string): Observable<Product[]>{
    // step7: build URL based on keyword
    const searchURL = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    // use the http client to make GET req to baseUrl
    return this.getProducts(searchURL);
  }
  
  // CUSTOM RETURN PRODUCTS (all products)
  private getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchURL).pipe(
      // we're going to use map to map the data to our given data type
      map(response => response._embedded.products)
    );
  }

  // CUSTOM RETURN SINGLE PRODUCT (product.details.component)
  getProduct(theId: number):Observable<Product>{
    // need to build the url based on the product id
    const productURL = `${this.baseUrl}/${theId}`;
    // call the rest api based on the product url
    // get<Product> because there is no word "_embedded" that is being returned by the json
    // so safe gamitin to
    return this.httpClient.get<Product>(productURL);
  }

  // getProductCategories method
  getProductCategories(): Observable<ProductCategory[]>{ // return list of productCategories

    // use the http client to make GET req to baseUrl
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      // we're going to use map to map the data to our given data type
      map(response => response._embedded.productCategory) 
    );
  }

  // pagination support for all products
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    categoryId: number):
     Observable<GetResponseProducts>{ // return  an interface because we need to access metadata in calling application 

    // build URL based on category id, page, and size
    const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` 
                    + `&page=${thePage}&size=${thePageSize}`;
    //  const searchUrl = `${this.baseUrl}`
    //                 + `?page=${thePage}&size=${thePageSize}`; // WRONG

    // use the http client to make GET req to baseUrl
    return this.httpClient.get<GetResponseProducts>(searchURL);
    
  }

  // pagination support for search keyword
  searchProductPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string):
     Observable<GetResponseProducts>{

      // build URL based on keyword, page, and size
    const searchURL = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` 
    + `&page=${thePage}&size=${thePageSize}`;

     // use the http client to make GET req to baseUrl
     return this.httpClient.get<GetResponseProducts>(searchURL);

    
  }



  
}

// GET RESPONSE INTERFACE
// supporting interface to help us with mapping
// unwraps the JSON from Spring Data REST using _embedded entry
// get the metadata for pagination
interface GetResponseProducts {
  _embedded: {
    products: Product[]
  },
  // metadata for pagination (spring boot)
  page: {
    "size": number,
    "totalElements": number,
    "totalPages": number,
    "number": number
  }
}

// we'll use this GetResponseProductCategory for calling REST API
// unwraps the JSON from Spring Data REST using _embedded entry
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
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
