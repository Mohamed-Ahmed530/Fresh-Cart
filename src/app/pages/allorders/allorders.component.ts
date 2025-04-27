import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { IAllOrders } from '../../shared/interFaces/IAllOrders';


@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit { 

  private readonly ordersService = inject(OrdersService);
  pLATFORM_ID = inject(PLATFORM_ID);

  allOrders!:IAllOrders[];


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders ():void{
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userId = localStorage.getItem("userId") as string;
      this.ordersService.getAllOrder(userId).subscribe({
        next:res=>{
          this.allOrders = res;
        }
      })
    }
  }

}