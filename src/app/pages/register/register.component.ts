import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  private readonly authService = inject( AuthService )
  private readonly router = inject( Router )
  
  
  // ===================//
  // registerForm: FormGroup = new FormGroup({
    //   name: new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/) ] ),
    //   rePassword: new FormControl(null, [Validators.required]),
    //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
    // }, {validators: this.confirmPassword});
    // ,{updateOn:"submit"}  
    
    //============ pest syntax ===============
    private readonly formBuilder = inject( FormBuilder )
    
  registerForm:FormGroup = this.formBuilder.group({
    name:[null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/) ]],
    rePassword:[null, [Validators.required]],
    phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators: this.confirmPassword})
  // ===================//





  isLoading:boolean = false;  //check spinner

  msgError:string = "";
  succcess:string = "";

    submitForm (){
    // console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          // console.log(res);
          if(res.message === "success"){  
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 1000);
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
    }else{
      this.registerForm.markAllAsTouched();
    }
  }

  // rePassword
  confirmPassword(group:AbstractControl){

  const password = group.get('password')?.value;
  const rePassword = group.get('rePassword')?.value;

  return  password === rePassword ? null : {mismatch:true};

  }

}