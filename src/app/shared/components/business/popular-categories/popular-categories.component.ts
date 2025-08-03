import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ICategory } from '../../../interFaces/Icategory';

@Component({
    selector: 'app-popular-categories',
    imports: [CarouselModule],
    templateUrl: './popular-categories.component.html',
    styleUrl: './popular-categories.component.scss',
})
export class PopularCategoriesComponent implements OnInit, OnDestroy {
    private readonly categoriesService = inject(CategoriesService);

    categories: ICategory[] = [];
    
    categorySubscription: Subscription = new Subscription();

    // sliders
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navSpeed: 700,
        navText: [
        '<i class="fa-solid fa-arrow-left text-green-500"></i>',
        '<i class="fa-solid fa-arrow-right text-green-500"></i>',
        ],
        responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 2,
        },
        740: {
            items: 4,
        },
        940: {
            items: 6,
        },
        },
        nav: true,
    };

    ngOnInit(): void {
        this.getCategoriesData();
    }

    getCategoriesData() {
        this.categorySubscription = this.categoriesService.getAllCategories().subscribe({
            next: (res) => {
            this.categories = res.data;
            },
        });
    }

    ngOnDestroy(): void {
        this.categorySubscription.unsubscribe();
    }
}
