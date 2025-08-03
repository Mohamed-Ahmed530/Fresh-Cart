import { Component } from '@angular/core';
import { PopularCategoriesComponent } from '../../shared/components/business/popular-categories/popular-categories.component';
import { MainSliderComponent } from '../../shared/components/ui/main-slider/main-slider.component';
import { AllProductsComponent } from './components/all-products/all-products.component';

@Component({
  selector: 'app-home',
  imports: [AllProductsComponent, PopularCategoriesComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  
}
