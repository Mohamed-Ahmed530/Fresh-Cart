import { Component, computed, HostListener, inject, input, Input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  // @Input() isLogin: boolean = true;
  isLogin = input<boolean>(true);

  

  // =================
  private readonly cartService = inject(CartService)

  counterofCar:Signal<number> = computed( ()=>  this.cartService.numOfCart()  )

  
  // ========== LogOut ==========
  private readonly authService = inject(AuthService)

  logOut(){
  this.authService.logOutUser();
  }
  

  // =====================

  scrollp: boolean = false;

  @HostListener('window:scroll') onscroll() {
    if (window.scrollY > 0) {
      this.scrollp = true;
    } else {
      this.scrollp = false;
    }
  }
  

  // =====================

    ngOnInit(): void {

        // Counter Of Caart
        this.cartService.getLoggedUserCart().subscribe({
          next:(res)=>{
            this.cartService.numOfCart.set( res.numOfCartItems )
          }
        })

    }




  }