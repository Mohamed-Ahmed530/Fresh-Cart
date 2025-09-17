import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ErrorMessageComponent } from "../../shared/components/ui/error-message/error-message.component";

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit  {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly ordersService = inject(OrdersService)
  private readonly formBuilder = inject( FormBuilder )

  checkOutForm!: FormGroup;
  cartId!:string;
  isvalid:WritableSignal<boolean> = signal(false)

  ngOnInit(): void {
    this.getCartId();
    this.initForm();
  }
  
  getCartId (){

    // this.cartId = this.activatedRoute.snapshot.params['cartId']

    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId =  param.get("id")!
      }
    })
  }


  initForm(){
    this.checkOutForm = this.formBuilder.group({
      details:[null, [Validators.required]],
      phone:[null, [Validators.required,  Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null, [Validators.required]]
    })
  }

  
  submitForm() {
    // onLine
    if (this.checkOutForm.valid) {
      this.ordersService.onlinePaymennt(this.cartId, this.checkOutForm.value).subscribe({
        next:(res)=>{
          setTimeout(()=>{
            if (res.status === "success") {
              open(res.session.url, "_self")
            }
          },1000)
          this.isvalid.set(true);
          },error:(err)=>{
          this.isvalid.set(false);
          }
      })
    }

    // cash
    // this.ordersService.cashOrder(this.cartId, this.checkOutForm.value).subscribe({
    //   next:(res)=>{
    //     // console.log(res);
    //   }
    // })

  }

}