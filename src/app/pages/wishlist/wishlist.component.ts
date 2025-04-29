import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { IWishlist } from '../../shared/interFaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);  

  isLoading:boolean = true;


  wishListData:IWishlist = {} as IWishlist

  ngOnInit(): void {
    this.getWishListData();    
  }


  getWishListData():void{
    this.wishListService.getProductToWishlist().subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.wishListData = res
        // console.log(res);
      },error:(err)=>{
        this.isLoading = false;
        // console.log(err);
      }
    })
  }

  removeItem(id:string){
    this.wishListService.removeProductToWishlist(id).subscribe({
      next:(res)=>{
        // console.log(res)
        this.getWishListData()
        this.toastrService.success(res.message)
      },error:(err)=>{
        // console.log(err)
      }
    })
  }


  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        
        this.cartService.numOfCart.set( res.numOfCartItems )
        if (res.status === "success") {
          this.toastrService.success(res.message)
        }
      }
    })
  }


}
