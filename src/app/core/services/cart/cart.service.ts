import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
}) 
export class CartService {
  


  constructor( private httpClient:HttpClient ) { }

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, 
      {
        "productId": id
      }
    )
  }

  getLoggedUserCart ():Observable<any>{

    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`)

  }

  removeSpesificCart(id:string):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)

  }
  
  updateProductQuantity(id:string, newCount:number):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      },
      )

  }

  clearCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

  // numOfCart:BehaviorSubject<number> = new BehaviorSubject(0)

  numOfCart:WritableSignal<number> = signal(0)

}