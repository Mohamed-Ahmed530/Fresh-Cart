import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  step:number = 1;

  isLoading:boolean = false;  //check spinner
  success:string = "";
  msgError:string = "";

  private readonly formBuilder = inject( FormBuilder )


  verifyEmail:FormGroup = this.formBuilder.group({
    email:[null, [Validators.required, Validators.email]]
  })

  verifyCode:FormGroup = this.formBuilder.group({
    resetCode:[null, [Validators.required, Validators.pattern(/^[0-9]{5}$/)]]
  })
  
  resetPassword:FormGroup = this.formBuilder.group({
    email:[null, [Validators.required, Validators.email]],
    newPassword:[null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/) ]]
  })


    verifyEmailSubmit(){

      let emailValue = this.verifyEmail.get('email')?.value
      this.resetPassword.get('email')?.patchValue(emailValue)

      if (this.verifyEmail.valid) {
        this.isLoading=true;
          this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
            next:(res)=>{
              console.log(res);
              if (res.statusMsg === 'success') {
                setTimeout(()=>{
                  this.step = 2;
                },1000);
                this.success = res.message
              }
              this.isLoading = false;
            },error:(err:HttpErrorResponse)=>{
              console.log(err.error.message);
              if (err.error.message) {
                this.msgError = err.error.message;
              }else{
                this.msgError = "";
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
        this.authService.setCodeVerify(this.verifyCode.value).subscribe({
          next:(res)=>{
            console.log(res);
            if (res.status === 'Success') {
              setTimeout(()=>{
                this.step = 3;
              },500);
              this.success = res.message
            }
            this.isLoading = false;
          },error:(err:HttpErrorResponse)=>{
            console.log(err.error.message);
            if (err.error.message) {
              this.msgError = err.error.message;
            }else{
              this.msgError = "";
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
        this.authService.setResetPassword(this.resetPassword.value).subscribe({
          next:(res)=>{
            console.log(res);
            localStorage.setItem("token",res.token)
  
            this.authService.getUserData()
  
            setTimeout(() => {
            this.router.navigate(['/home'])
            }, 500);

            this.isLoading = false;
          },error:(err:HttpErrorResponse)=>{
            console.log(err.error.message);
            if (err.error.message) {
              this.msgError = err.error.message;
            }else{
              this.msgError = "";
            }
            this.isLoading = false;
          }
        })
      }else{
        this.resetPassword.markAllAsTouched();
      }
    }

}
