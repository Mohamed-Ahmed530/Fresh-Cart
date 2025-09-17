import { Component, inject, input, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../core/services/cart/cart.service';
import { WishListService } from '../../../../core/services/wishList/wish-list.service';
import { RouterLink } from "@angular/router";
import { Product } from '../../../interFaces/Product';
import { TermTextPipe } from '../../../pipes/term-text.pipe';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink, CurrencyPipe, TermTextPipe, NgClass], 
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);

  
  // @Input() product!: Product
  product = input.required<Product>()

  wishList: string[] = [];

    // cart
  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.numOfCart.set(res.numOfCartItems);
        if (res.status === 'success') {
          this.toastrService.success(res.message);
        }
      },
    });
  }

  
  // WishList 
  addToWishList(id: string): void {
    this.wishListService.addProductToWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message);
          this.wishList.push(id);
        }
      },
    });
  }
  
  isInWishList(id: string): boolean {
    return this.wishList.includes(id);
  }

}
