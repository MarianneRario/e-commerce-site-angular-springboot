import { Product } from "./product";

export class CartItem {
    // get all the important fields from products
    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number
    // add quantity for cart item
    quantity: number;

    // create a constructor where you pass in a product 
    // and then we'll simply make the appropriate assignments here

    constructor(product: Product){
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

        this.quantity = 1; // set the default to 1
    }

}
