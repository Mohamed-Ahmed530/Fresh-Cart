import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { IAllOrders } from '../../../shared/interFaces/IAllOrders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly httpClient = inject(HttpClient)

  constructor() { }


  cashOrder(id:string, shippingAddress:{details:string, phone:string, city:string}):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,{shippingAddress}  
    )
  }

  getAllOrders():Observable<any>{
    return this.httpClient.get<IAllOrders>(`${environment.baseUrl}/api/v1/orders/user/`)
  }

  getUserOrders(id:string):Observable<any>{
    return this.httpClient.get<IAllOrders>(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }

  onlinePaymennt(id:string, data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data
      }
    )
  }



}