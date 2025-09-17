import { Subject, takeUntil, timer } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from "../../shared/components/ui/error-message/error-message.component";
import { InputComponent } from "../../shared/components/ui/input/input.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly authService = inject( AuthService );
  private readonly formBuilder = inject( FormBuilder );
  private readonly router = inject( Router );
  loginForm!: FormGroup;

  private destroy$ = new Subject<void>();

  success:string = "";
  msgError:string = "";
  isCallingApi:boolean = false;
  togilPassword:boolean = false;


  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.pattern(/^.{6,}$/)]]
    })
  }


  onSubmit (){
    if (this.loginForm.valid) {
      this.msgError = "";
      if (!this.isCallingApi) {
        this.isCallingApi = true;
          this.authService.sendLoginForm(this.loginForm.value).pipe(takeUntil(this.destroy$)).subscribe({
          next:(res)=>{
            if(res.message === "success"){  
              timer(500).pipe(takeUntil(this.destroy$)).subscribe( ()=>{
                localStorage.setItem("token", res.token);
                this.authService.getUserData();
                this.router.navigate(['/home'])
              } )
              this.success = res.message;
            }
            this.isCallingApi = false;
          },
          error:(err:HttpErrorResponse)=>{
            if (err.error.message) {
              this.msgError =  err.error.message;
            }else{
              this.msgError = "";
            }
            this.isCallingApi = false;
          }
        })
      }
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

  toggle(){
    this.togilPassword = !this.togilPassword;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}