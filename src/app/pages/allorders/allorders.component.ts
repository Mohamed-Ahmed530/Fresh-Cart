import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { AllOrders } from '../../shared/interFaces/AllOrders';


@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit { 

  private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);
  pLATFORM_ID = inject(PLATFORM_ID);

  allOrders!:AllOrders[];


  ngOnInit(): void {
    this.getOrders();
  }

  // ?
  // getUserId() {
  //   this.authService.userData.subscribe({
  //     next:(res)=>{
  //       res.id && this.getOrders(res.id)
  //     }
  //   })
  // }

  getOrders ():void{
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userId = localStorage.getItem("userId") as string;
      this.ordersService.getUserOrders(userId).subscribe({
        next:(res)=>{
          this.allOrders = res;
        }
      })
    }
  }

}