import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interFaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interFaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe} from '@angular/common';
import { RouterLink } from '@angular/router';
import { TermTextPipe } from '../../shared/pipes/term-text.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-home',
  imports: [ CarouselModule, RouterLink, CurrencyPipe, TermTextPipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
  
  // Search For Product 
  text:string = "";
  //============================

  private readonly productsService = inject(ProductsService); //1

  private readonly categoriesService = inject(CategoriesService); //2

  private readonly cartService = inject(CartService);

  private readonly wishListService = inject(WishListService);

  private readonly toastrService = inject(ToastrService);  
  

  products:IProduct[] = [];
  
  categories:ICategory[] = [];


  productSubscription = new Subscription
  categorySubscription = new Subscription


  getProductData (){ 
    this.productSubscription = this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data;
      }
    })
  }

  getCategoriesData(){  
    this.categorySubscription = this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data;
      }
    })
  }

  ngOnInit(): void {
    this.getProductData();
    this.getCategoriesData(); 
  }

  
  // ==============================
  // cart 

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

  // =============================

  ngOnDestroy(): void {

    this.productSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
    
  }


  
  // ==============================
  // WishList
  
  addToWishList(id:string):void{
    this.wishListService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        // console.log(res);
        if (res.status === "success") {
          this.toastrService.success(res.message)
        }
      },
      error:(err)=>{
        // console.log(err);
      }
    })

  }




  // ==============================

  // sliders
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: [ '<i class="fa-solid fa-arrow-left text-green-500"></i>' , '<i class="fa-solid fa-arrow-right text-green-500"></i>' ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
}