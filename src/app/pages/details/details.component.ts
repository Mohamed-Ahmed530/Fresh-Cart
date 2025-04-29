import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interFaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-details',
  imports: [ CurrencyPipe, CarouselModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);



  detailsProduct:IProduct | null = null;


  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct = p.get('id');
          
          this.productsService.getSpecificProducts(idProduct).subscribe({
            next:(res)=>{

              this.detailsProduct = res.data;
            },
            error:(err)=>{

            }
          })
          
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
      },error:(err)=>{

      }
    })
  }



  
  addToWishList(id:string):void{
    this.wishListService.addProductToWishlist(id).subscribe({
      next:(res)=>{
    
        if (res.status === "success") {
          this.toastrService.success(res.message)
        }
      },
      error:(err)=>{

      }
    })

  }


  // slider
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['',''],
    items:1,
    nav: false
  }

}