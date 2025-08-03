import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { Subscription } from 'rxjs';
import { TermTextPipe } from '../../shared/pipes/term-text.pipe';
import { Product } from '../../shared/interFaces/Product';

@Component({
  selector: 'app-details',
  imports: [ CurrencyPipe, CarouselModule, RouterLink, TermTextPipe ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);

  detailsProduct!:Product;
  relatedProducts!:Product[];

  subscription:Subscription = new Subscription()

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


  ngOnInit(): void {
    this.getId();
  }


  // Get Id from URL
  getId(){
      this.activatedRoute.paramMap.subscribe({
      next:(res:any)=>{
          // let idProduct = res.get('id');
          let idProduct = res?.params?.id;
          this.getDetails(idProduct)
        }
      })
      
      // Another way with snapshot
      // let idProduct:any = this.activatedRoute.snapshot.params
      // this.getDetails(idProduct.id)
  }

  getDetails(idProduct:string){
    this.subscription = this.productsService.getSpecificProducts(idProduct).subscribe({
      next:(res)=>{
        this.detailsProduct = res.data;
        this.getRelatedProducts(this.detailsProduct.category._id)
      },
      error:(err)=>{
      }
    })
  }

  getRelatedProducts(categoryID:string){
    this.productsService.getAllProducts(categoryID).subscribe({
      next:(res)=>{
        this.relatedProducts = res.data;
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


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  
}