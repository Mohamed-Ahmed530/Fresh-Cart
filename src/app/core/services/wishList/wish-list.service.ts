import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor( private httpClient:HttpClient ) {}


  addProductToWishlist(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
      "productId": id
  })
  } 
  

  
  
  getProductToWishlist():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }
  
  
  
  removeProductToWishlist(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  } 
}
