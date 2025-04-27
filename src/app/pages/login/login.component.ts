import { Component, inject } from '@angular/core';
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
export class LoginComponent {

  
  private readonly authService = inject( AuthService )
  private readonly formBuilder = inject( FormBuilder )
  private readonly router = inject( Router )


  
  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/) ] )
  // });
  // ,{updateOn:"submit"}   

  //============ pest syntax ===============
  loginForm: FormGroup = this.formBuilder.group({
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/) ]]
  })
  // =========================================



  isLoading:boolean = false;  //check spinner

  msgError:string = "";
  succcess:string = "";

    submitForm (){
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          // console.log(res);
          if(res.message === "success"){  

            setTimeout(() => {
            //1- save token
            localStorage.setItem("token", res.token)

            //2- call getUserData
            this.authService.getUserData()

            //3- navigate to home
              this.router.navigate(['/home'])
            }, 500);
            
            this.succcess = res.message;
          }
          this.isLoading = false;
        },
        error:(err:HttpErrorResponse)=>{
          // console.log(err);
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


}
