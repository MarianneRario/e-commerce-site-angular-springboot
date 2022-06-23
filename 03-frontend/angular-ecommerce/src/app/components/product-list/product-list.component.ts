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
  products: Product[];

  // step5: enhance ProductListComponent to read category id param
  currentCategoryId: number;

  // inject ProductService (contains the http client request(get))
  // inject the current/activated route (that loaded the component; useful for accessing route parameters )
  constructor(private productService: ProductService, 
              private route: ActivatedRoute) { } 

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { // subscribe on the param map on the given route
      this.listProducts(); // call the listProduct()
    });
    
  }

  // define the listProduct method
  listProducts(){
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
    if(hasCategoryId){
      // get the "id" param string; convert string to a number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    } else {
      // if the category id is not available ... default at category 1
      this.currentCategoryId = 1;

    }

    // method(getProductList) is invoked once subscribed
    this.productService.getProductList(this.currentCategoryId).subscribe(  // get the products for the given category id
      data => { // when the data is returned, we can assign it to our own property
        // assign the result to product array
        this.products = data;
      }
    )
  }

}
