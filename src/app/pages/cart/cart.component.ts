import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interFaces/icart';
import { CurrencyPipe } from '@angular/common';
import { log } from 'console';
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
        this.cartDetails = res.data    //?
        this.toastrService.success(res.status)
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
          this.toastrService.success("The products have been successfully removed from your shopping cart.")
        }
      },error:(err)=>{
        // console.log(err);
      }
    })
  }

}