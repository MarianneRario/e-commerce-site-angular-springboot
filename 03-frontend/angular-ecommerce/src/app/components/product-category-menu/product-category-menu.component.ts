import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  // define property for product-categories

  // - create array of product categories
  productCategories : ProductCategory[];

  // - inject product service in constructor
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // - call listProductCategories (to call our service)
    this.listProductCategories();
  }

  listProductCategories() {
    // - invoke the service
    this.productService.getProductCategories().subscribe(
      data => {
        console.log("Product Categories = " + JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }

}
