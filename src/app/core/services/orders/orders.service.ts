import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { IAllOrders } from '../../../shared/interFaces/IAllOrders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

    constructor() { }
    private readonly httpClient = inject(HttpClient)

    getAllOrder(id:string):Observable<any>{
      return this.httpClient.get<IAllOrders>(`${environment.baseUrl}/api/v1/orders/user/${id}`)
    }

    chechOutPaymennt(id:string, data:object):Observable<any>{

      return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
        {
          "shippingAddress": data
        }
      )
    }



  // ============
  // chechCashorder(id:string, data:{}):Observable<any>{

  //   return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
  //     {
  //       "shippingAddress": data
  //     }  
  //   )
  // }

}