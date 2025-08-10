import { ToastrService } from 'ngx-toastr';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Wishlist } from '../../shared/interFaces/Wishlist';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  // isLoading:boolean = true;
  isLoading: WritableSignal<boolean> = signal(true);

  // wishListData:Wishlist = {} as Wishlist
  wishListData: WritableSignal<Wishlist> = signal({} as Wishlist);

  ngOnInit(): void {
    this.getWishListData();
  }

  getWishListData(): void {
    this.wishListService.getProductToWishlist().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.wishListData.set(res);
        // console.log(res);
      },
      error: (err) => {
        this.isLoading.set(false);
        // console.log(err);
      },
    });
  }

  removeItem(id: string) {
    this.wishListService.removeProductToWishlist(id).subscribe({
      next: (res) => {
        // console.log(res)
        this.getWishListData();
        this.toastrService.success(res.message);
      },
      error: (err) => {
        // console.log(err)
      },
    });
  }

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
}
