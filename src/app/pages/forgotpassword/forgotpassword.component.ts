import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../shared/components/ui/error-message/error-message.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent implements OnInit, OnDestroy {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject( FormBuilder );

  verifyEmail!:FormGroup;
  verifyCode!:FormGroup;
  resetPassword!:FormGroup;

  togilPassword:boolean = false;

  private destroy$ = new Subject<void>();

  step:number = 1;

  isLoading:boolean = false;  
  successEmail:WritableSignal<string> = signal("");
  errorMsgEmail:WritableSignal<string> = signal("");
  successCode:WritableSignal<string> = signal("");
  errorMsgCode:WritableSignal<string> = signal("");
  successPassword:WritableSignal<string> = signal("");
  errorMsgPassword:WritableSignal<string> = signal("");

  ngOnInit(): void {
      this.initForm();
  }

  initForm(){
    this.verifyEmail = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]]
    })
  
    this.verifyCode = this.formBuilder.group({
      resetCode:[null, [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]]
    })
    
    this.resetPassword = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      newPassword:[null, [Validators.required, Validators.pattern(/^.{6,}$/)]]
    })
  }

  verifyEmailSubmit(){
    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)
    if (this.verifyEmail.valid) {
      this.isLoading=true;
      this.errorMsgEmail.set("")
        this.authService.setEmailVerify(this.verifyEmail.value).pipe(takeUntil(this.destroy$)).subscribe({
          next:(res)=>{
            if (res.statusMsg === 'success') {
              setTimeout(()=>{
                this.step = 2;
              },1000);
              this.successEmail.set(res.message);
            }
            this.isLoading = false;
          },error:(err:HttpErrorResponse)=>{
            if (err.error.message) {
              this.errorMsgEmail.set(err.error.message)
            }
            this.isLoading = false;
          }
        })
      }
    else{
      this.verifyEmail.markAllAsTouched();
    }
  }

  verifyCodeSubmit(){
    if (this.verifyCode.valid) {
      this.isLoading=true;
      this.errorMsgCode.set("");
      this.authService.setCodeVerify(this.verifyCode.value).pipe(takeUntil(this.destroy$)).subscribe({
        next:(res)=>{
          if (res.status === 'Success') {
            setTimeout(()=>{
              this.step = 3;
            },500);
              this.successCode.set(res.message);
          }
          this.isLoading = false;
        },error:(err:HttpErrorResponse)=>{
          if (err.error.message) {
            this.errorMsgCode.set(err.error.message);
          }
          this.isLoading = false;
        }
      })
    }else{
      this.verifyCode.markAllAsTouched();
    }
  }

  resetPasswordSubmit(){
    if (this.resetPassword.valid) {
      this.isLoading=true;
      this.errorMsgPassword.set("");
      this.authService.setResetPassword(this.resetPassword.value).pipe(takeUntil(this.destroy$)).subscribe({
        next:(res)=>{
          localStorage.setItem("token",res.token)
          this.authService.getUserData()
          setTimeout(() => {
          this.router.navigate(['/home'])
          }, 500);
          this.successPassword.set(res.message);
          this.isLoading = false;
        },error:(err:HttpErrorResponse)=>{
          if (err.error.message) {
            this.errorMsgPassword.set(err.error.message);
          }
          this.isLoading = false;
        }
      })
    }else{
      this.resetPassword.markAllAsTouched();
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