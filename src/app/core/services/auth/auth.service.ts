import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  // signUp
  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  
  // signIn
  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }


  // ===========

  userData:any;

  getUserData():void{
    this.userData = jwtDecode(localStorage.getItem("token")!);
    // console.log(this.userData);
    
  }

  
  // =========== LogOut ===========
  private readonly router = inject(Router)

  logOutUser():void{

    localStorage.removeItem("token");

    this.userData = "";

    this.router.navigate(["/login"]);

  }



// ===========
// Forgot Password


setEmailVerify(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}


setCodeVerify(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}


setResetPassword(data:object):Observable<any>{
  return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}




}