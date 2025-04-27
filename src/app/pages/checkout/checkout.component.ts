import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit  {

  private readonly formBuilder = inject( FormBuilder )
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly ordersService = inject(OrdersService)

  checkOutForm!: FormGroup ;

  cartId:string = "";

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
  

  initForm(){
    this.checkOutForm = this.formBuilder.group({
      details:[null, [Validators.required]],
      phone:[null, [Validators.required,  Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null, [Validators.required]]
    })
  }

  getCartId (){
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId =  param.get("id")!
      }
    })
  }

  isvalid:boolean = false

  submitForm(){
    if (this.checkOutForm.valid) {
      this.ordersService.chechOutPaymennt(this.cartId, this.checkOutForm.value).subscribe({
        next:(res)=>{

          setTimeout(()=>{
            if (res.status === "success") {
              open(res.session.url, "_self")
            }
          },1000)
          this.isvalid = true
          },error:(err)=>{
            
          this.isvalid = false
          }
      })
    }

  
  }

}