import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interFaces/icart';
import { CurrencyPipe } from '@angular/common';
import { log } from 'console';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService)

  cartDetails:ICart = {} as ICart

  isLoading: boolean = true;


  ngOnInit(): void {
      this.getCartData();
  }

  getCartData ():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.cartDetails = res.data 
        this.isLoading = false;
      },error:(err)=>{
        // console.log(err);
        this.isLoading = false;
      }
    })
  } 

  removeItem(id:string):void{
    this.cartService.removeSpesificCart(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.cartDetails = res.data   //?
        this.cartService.numOfCart.set( res.numOfCartItems )
      },error:(err)=>{
        // console.log(err);
      }
    })
  }

  updateItem(id:string, count:number):void{
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) =>{
        // console.log(res);
        this.cartDetails = res.data    //?
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
          this.cartDetails = {} as ICart;
          this.cartService.numOfCart.set(0)
        }
      },error:(err)=>{
        // console.log(err);
      }
    })
  }

}