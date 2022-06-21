import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  // create a product property (array of Product)
  products: Product[];

  // inject ProductService (contains the http client request(get))
  constructor(private productService: ProductService) { } 

  ngOnInit(): void {
    this.listProducts(); // call the listProduct()
  }

  // define the listProduct method
  listProducts(){
    // method(getProductList) is invoked once subscribed
    this.productService.getProductList().subscribe( 
      data => { // when the data is returned, we can assign it to our own property
        // assign the result to product array
        this.products = data;
      }
    )
  }

}
