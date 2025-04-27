import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule} from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interFaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [CarouselModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private readonly categoriesService = inject(CategoriesService)

  categories:ICategory[] = []
  categoriSubscription = new Subscription;

  getCategoriesData (){
    this.categoriSubscription = this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.categories = res.data;
      }
    })
  }

  ngOnInit(): void {
      this.getCategoriesData();
  }


  ngOnDestroy(): void {
    this.categoriSubscription.unsubscribe;
  }


  // ============================================


  // count1:number= 0;


  // changeNumber (){

  //   this.count1 = this.count1 += 1;

  // }

  // Signals========

  //1- update()
  //2- set()
  //3- get()   ->  ()


  //1- update()


  // count2:WritableSignal<number> = signal(0)


  //   changeNumber (){

  //   this.count2.update( (value)=> value + 1  )

  // }

  //2- set()

//   name:WritableSignal<string> = signal("M")


//   changeString (){

//   this.name.set("A")

// }

}