import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interFaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../shared/pipes/term-text.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [ RouterLink, CurrencyPipe, TermTextPipe, SearchPipe, FormsModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  // Search For Product
  text:string = "";

  private readonly productsService = inject(ProductsService)

  private readonly cartService = inject(CartService) 

  private readonly toastrService = inject(ToastrService);


  products:IProduct[] = [];

  productSubscription = new Subscription;

  getProductData (){
    this.productSubscription = this.productsService.getAllProducts().subscribe({
      next:(res)=>{
          this.products = res.data;
      }
    })
  }

  ngOnInit(): void {
      this.getProductData();
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


  ngOnDestroy(): void {
    this.productSubscription.unsubscribe;
  }


}