import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { LoginUser, RegisterUser } from '../../../shared/interFaces/AuthUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient)
  constructor() {}

  env = environment.baseUrl

  // signUp
  sendRegisterForm(data:RegisterUser):Observable<any>{
    return this.httpClient.post(`${this.env}/api/v1/auth/signup`,data)
  }
  
  // signIn
  sendLoginForm(data:LoginUser):Observable<any>{
    return this.httpClient.post(`${this.env}/api/v1/auth/signin`,data)
  }


  // ===========

  // userData: BehaviorSubject<any> = new BehaviorSubject(null)
  userData: any;

  getUserData():void{
    if(localStorage.getItem("token")){
      this.userData = jwtDecode(localStorage.getItem("token")!);
      // console.log(this.userData);
    }
    
  }

  // =========== LogOut ===========
  private readonly router = inject(Router)

  logOutUser():void{

    localStorage.removeItem("token");

    // this.userData.next(null) 
    this.userData = ""

    this.router.navigate(["/login"]);

  }

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