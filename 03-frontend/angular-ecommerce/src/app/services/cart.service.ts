import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {CartItem} from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // define a property of cart item (cart item class)
  cartItems: CartItem[] = []

  // total price
  // Subject - subclass of observable; 
  // can be use to publish event in our code; event will be sent to all of the subscribers
  // more on the subject topic here: https://www.tektutorialshub.com/angular/subjects-in-angular/
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    // check if we already have the item in our cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined!; // isa isa lang ang laman

    if(this.cartItems.length > 0){ // ibig sabihin may laman ang cart array

      // find the item in the cart based on the item id
      // existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)
      for(let tempCartItem of this.cartItems){
        // ibig sabihin parehas sila ng id, yung item nasa cart na, mag aadd nalang
        if(tempCartItem.id === theCartItem.id){ 
          existingCartItem = theCartItem;
          break;
        }
      }
      // sample products
      // java book 1, coffee mug 2 ===== keyboard 3
      // java book 1, coffee mug 2,  keyboard 3 ==== java book 1


      // check if we found the given item
      alreadyExistInCart = (existingCartItem != undefined); // true or false
    }

    if (alreadyExistInCart){ // pag nasa cart na ang item
      // increment the item quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to array
      this.cartItems.push(theCartItem);
    }

    // log the cart data for debugging purposes
    // console.log(`Existing Cart Item: ${existingCartItem.name}, ${existingCartItem.quantity}`)
    // compute cart total price and total quantity
    this.computeCartTotals();
  
  }


  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new value ... all subscribers will receive the new data
    // this will publish the events to all subscribers 
    // one event for totalPrice, one event for totalQuantity
    // the .next() will publish/send the event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log the cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Contents of the Cart");
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`
            name: ${tempCartItem.name}, 
            quantity: ${tempCartItem.quantity},
            unitPrice: ${tempCartItem.unitPrice},
            subTotal: ${subTotalPrice}`)
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
    console.log("----------------");
  }
}
/**
 * NOTE: 
 * Yung item isang beses nya lang ilalagay sa cart, kapag andoon na, tas nag add to cart ulit si client... 
 * hahanapin nya ung id ng idadagdag ni client kung existing na ba sa cart, pag existing na
 * dadagdagan nya nalang ung quantity. However pag di pa, ipupush nya dun sa cart natin.
 * 
 * So ung computeCartTotals method, meron dung array ng cartItems na may unitPrice at quantity...
 * dinadagdagan lang ung quantity pero ung item isa lang parang palatandaan un na andoon ung item
 */