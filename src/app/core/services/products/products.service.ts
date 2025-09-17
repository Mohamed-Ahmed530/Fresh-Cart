import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    constructor( private httpClient:HttpClient ) { }

    getAllProducts(pageNumber:number = 1):Observable<any>{
      return this.httpClient.get(`${environment.baseUrl}/api/v1/products?page=${pageNumber}`)
    }

    getProducts(categoryID?:string):Observable<any>{
      //* Related Products
      let url = categoryID? `${environment.baseUrl}/api/v1/products?category[in]=${categoryID}` : `https://ecommerce.routemisr.com/api/v1/products`;
      return this.httpClient.get(url)
    }
    
    getSpecificProducts(id:string | null):Observable<any>
    {
      return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
    }
}