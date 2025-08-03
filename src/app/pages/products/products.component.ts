import { Component } from '@angular/core';
import { AllProductsComponent } from "../home/components/all-products/all-products.component";


@Component({
  selector: 'app-products',
  imports: [AllProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent{

}