import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brands } from '../../shared/interFaces/Brands';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy {

  private readonly brandsService = inject(BrandsService);
  // brands:Brands[] = [] 
  brands:WritableSignal<Brands[]> = signal([]) 

  ngOnInit(): void {
      this.AllBrands()
  }

  brandsSubscription = new Subscription
  
  AllBrands(){
    this.brandsSubscription = this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.brands.set(res.data);
      }
    })
  }

  ngOnDestroy(): void {
    this.brandsSubscription.unsubscribe();
  }

}