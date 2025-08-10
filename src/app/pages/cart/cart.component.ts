import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Cart } from '../../shared/interFaces/Cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({ 
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService);  
  

  // cartDetails:Cart = {} as Cart
  cartDetails:WritableSignal<Cart> = signal({} as Cart)

  isLoading: WritableSignal<boolean> = signal(true);


  ngOnInit(): void {
      this.getCartData();
  }

  getCartData ():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.cartDetails.set(res.data); 
        this.isLoading.set(false);
      },error:(err)=>{
        // console.log(err);
        this.isLoading.set(false);
      }
    })
  } 

  removeItem(id:string):void{
    this.cartService.removeSpesificCart(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.cartDetails.set(res.data)   //?
        this.cartService.numOfCart.set( res.numOfCartItems )
        this.toastrService.success("The product has been successfully removed from your shopping cart.")
      },error:(err)=>{
        // console.log(err);
      }
    })
  }

  updateItem(id:string, count:number):void{
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) =>{
        // console.log(res);
        this.cartDetails.set(res.data);  
        this.toastrService.success("The required number of the product has been updated")
      },error:(err)=>{
        // console.log(err);
      }
    })
  }

  clearItems():void{
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        // console.log(res);
        if (res.message === "success") {
          this.cartDetails.set( {} as Cart);      //!
          this.cartService.numOfCart.set(0)
          this.toastrService.success("The products have been successfully removed from your shopping cart")
        }
      },error:(err)=>{
        // console.log(err);
      }
    })
  }

}