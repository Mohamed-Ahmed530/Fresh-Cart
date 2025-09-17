import { Subject, takeUntil } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../shared/components/ui/error-message/error-message.component";
import { InputComponent } from "../../shared/components/ui/input/input.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessageComponent, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {

  private readonly authService = inject( AuthService );
  private readonly router = inject( Router );
  private readonly formBuilder = inject( FormBuilder );
  registerForm!:FormGroup;
  
  
  success:string = "";
  msgError:string = "";
  isCallingApi:boolean = false; 
  togglePassword:boolean = false;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initForm();
  }

  // ===================//
  // registerForm: FormGroup = new FormGroup({
    //   name: new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/) ] ),
    //   rePassword: new FormControl(null, [Validators.required]),
    //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
    // }, {validators: this.confirmPassword});
    // ,{updateOn:"submit"}  
    
    //=== best syntax with (FormBuilder) ======
  initForm(){
    this.registerForm = this.formBuilder.group({
      name:[null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
      rePassword:[null, [Validators.required]],
      phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, {validators: this.confirmPassword})
  }
  
  // rePassword
  confirmPassword(group:AbstractControl){
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return  password === rePassword ? null : {mismatch:true};
  }

  onSubmit (){
    if (this.registerForm.valid) {
      this.msgError = "";
      if (!this.isCallingApi) {
        this.isCallingApi = true;
        this.authService.sendRegisterForm(this.registerForm.value).pipe(takeUntil(this.destroy$)).subscribe({
          next:(res)=>{
            if(res.message === "success"){  
              setTimeout(() => {
                this.router.navigate(['/login'])
              }, 1000);
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
    }else{
      this.registerForm.markAllAsTouched();
    }
  }

  // Toggle password
  toggle(){
    this.togglePassword = !this.togglePassword;
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}