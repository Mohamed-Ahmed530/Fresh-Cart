import { Subscription, timer } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly authService = inject( AuthService )
  private readonly formBuilder = inject( FormBuilder )
  private readonly router = inject( Router )

  subscription :Subscription = new Subscription();
  subscriptionTimer :Subscription = new Subscription();

  loginForm!: FormGroup


  isLoading:boolean = false;  //check spinner

  msgError:string = "";
  succcess:string = "";

  togilPassword:boolean = false


  ngOnInit(): void {
    this.initForm()
  }


  initForm(){
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/) ]]
    })
  }


  submitForm (){
    if (this.loginForm.valid) {
      this.isLoading = true;
        this.subscription =  this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.message === "success"){  
            // setTimeout(() => {
            // //1- save token
            // localStorage.setItem("token", res.token)

            // //2- call getUserData
            // this.authService.getUserData()

            // //3- navigate to home
            //   this.router.navigate(['/home'])
            // }, 500);
            this.subscriptionTimer = timer(500).subscribe( ()=>{      // Another way
            //1- save token
            localStorage.setItem("token", res.token)

            //2- call getUserData
            this.authService.getUserData()

            //3- navigate to home
              this.router.navigate(['/home'])
            } )

            this.succcess = res.message;
          }
          this.isLoading = false;
        },
        error:(err:HttpErrorResponse)=>{
          if (err.error.message) {
            this.msgError =  err.error.message;
          }else{
            this.msgError = "";
          }
          this.isLoading = false;
        }
      })
    }
  }


  toggle(){
    this.togilPassword = !this.togilPassword
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionTimer.unsubscribe()
  }

}
