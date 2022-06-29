import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  // create a product property (array of Product)
  products: Product[] = [];

  // step5: enhance ProductListComponent to read category id param
  currentCategoryId: number = 1;
  
  // previousCategoryId
  previousCategoryId: number = 1;

  // to display category name
  currentCategoryName: string = "";

  // search mode for search component
  searchMode: boolean = false;

  // display the searched word
  theKeyword: string = "";

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0; 
  previousKeyword: string = "";



  // inject ProductService (contains the http client request(get))
  // inject the current/activated route (that loaded the component; useful for accessing route parameters )
  constructor(private productService: ProductService, 
              private route: ActivatedRoute) { } 

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { // subscribe on the param map on the given route
      this.listProducts(); // call the listProduct()
    });
    
  }

  // listProduct method -> will call handleListProducts
  listProducts(){
    // check if the route has a parameter for search
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if(this.searchMode){
      // do search work
      this.handleSearchProducts();
    } else {
      // just spit out the products
      this.handleListProducts();
    }

    
  }

  handleSearchProducts() {
    // get the actual keyword that the user enters
    this.theKeyword = this.route.snapshot.paramMap.get("keyword")!;

    // search for the product using given keyword
    // this.productService.searchProducts(this.theKeyword).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // )

    // if we have different keyword than the previous, set the pageNumber to 1
    if(this.previousKeyword != this.theKeyword){
      this.thePageNumber = 1; 
    }

    // keep track of the previous keyword
    this.previousKeyword = this.theKeyword;
    

    // search product for the given keyword and paginate if a lot 
    this.productService.searchProductPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.theKeyword
    ).subscribe(this.processResult());

  }

  // handleListProducts method
  handleListProducts(){
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
    if(hasCategoryId){
      // get the "id" param string; convert string to a number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get("name")!;
    } else {
      // if the category id is not available ... default at category 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    /**
     * PAGINATION
     */
    // check if we have different category id than previous
    // NOTE: Angular will reuse a component if it is curretly being viewed


    // if we have different category id than previous, reset the page number to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1; 
    }

    // keep track of the previous category id
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId},
                thePageNumber=${this.thePageNumber},
                previousCategoryId=${this.previousCategoryId}`);


    /**
     * get the products for the given category id 
     * method(getProductList) is invoked once subscribed
     */ 
    this.productService.getProductListPaginate(
                            this.thePageNumber-1, 
                            this.thePageSize, 
                            this.currentCategoryId).subscribe(this.processResult());
  }
  
  processResult(){ // came from the spring data rest
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1; // Spring data rest: pages are 0 based
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
  updatePageSize(pageSize: number){
    this.thePageSize = pageSize; // change pageSize
    this.thePageNumber = 1; // reset to 1
    this.listProducts(); // call the listProducts method to reset the page view
  }

}
