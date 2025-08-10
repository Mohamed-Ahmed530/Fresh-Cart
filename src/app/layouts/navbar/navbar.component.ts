import { Component, computed, HostListener, inject, input, Input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  private readonly authService = inject(AuthService)

  
  counterofCar:Signal<number> = computed( ()=>  this.cartService.numOfCart()  )

  
  // @Input() isLogin: boolean = true;
  isLogin = input<boolean>(true); 
  
  scrollp: boolean = false;
  
  private readonly cartService = inject(CartService)

  private readonly flowbiteService=inject(FlowbiteService)


  ngOnInit(): void {
      // Counter Of Caart
      this.cartService.getLoggedUserCart().subscribe({
        next:(res)=>{
          this.cartService.numOfCart.set( res.numOfCartItems )
        }
      })
  }

  
  // flowbite
  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }


  // ========== LogOut ==========
  logOut(){
  this.authService.logOutUser();
  }
  

  @HostListener('window:scroll') onscroll() {
    if (window.scrollY > 0) {
      this.scrollp = true;
    } else {
      this.scrollp = false;
    }
  }
  
  }