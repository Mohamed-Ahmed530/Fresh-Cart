import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule} from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../shared/interFaces/Category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [CarouselModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private readonly categoriesService = inject(CategoriesService)

  // categories:Category[] = [];
  categories:WritableSignal<Category[]> = signal([]);
  categoriSubscription:Subscription = new Subscription();

  ngOnInit(): void {
      this.getCategoriesData();
  }


  getCategoriesData (){
    this.categoriSubscription = this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories.set(res.data);
      }
    })
  }



  ngOnDestroy(): void {
    this.categoriSubscription.unsubscribe();
  }

}