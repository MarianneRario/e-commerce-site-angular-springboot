import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // field that will contain the returned product
  product: Product = new Product();

  // get the id
  id: number;
  
  // INJECT DEPENDENCIES
  // inject ProductService (contains the http client request(get))
  // inject the current/activated route (that loaded the component; useful for accessing route parameters )
  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    // inside on initial function
    this.route.paramMap.subscribe(() => { // subscribe on the param map on the given route
      this.handleProductDetails(); // call the getProductDetails()
    });
  }

  // get the product based on name
  handleProductDetails(){
    // get the id param string from the path
    this.id = +this.route.snapshot.paramMap.get("id")!;

    // pass the id to the service function where the product will be returned
    this.productService.getProduct(this.id).subscribe(
      data => {
        this.product = data;
      }
    )
  }



}
