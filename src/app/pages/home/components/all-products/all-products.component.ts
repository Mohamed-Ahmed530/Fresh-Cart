import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { WishListService } from '../../../../core/services/wishList/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../shared/interFaces/Product';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../../../shared/pipes/term-text.pipe';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-all-products',
  imports: [RouterLink, CurrencyPipe, TermTextPipe, SearchPipe, FormsModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit, OnDestroy {

  
  // Search For Product 
  text:string = "";
  

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);  
  
  
  // products!:Product;  //* 1 solution
  // products:Product = {} as Product ; //* 2 solution
  // products:Product | null = null ;  //* 3 solution
  products:Product[] = [];  //* 3 solution
  
  productSubscription: Subscription = new Subscription();


  ngOnInit(): void {
    this.getProductData();
  }


  getProductData (){ 
    this.productSubscription = this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data;
      }
    })
  }

  
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

  
  // WishList
  addToWishList(id:string):void{
    this.wishListService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        if (res.status === "success") {
          this.toastrService.success(res.message)
        }
      }
    })

  }


  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}