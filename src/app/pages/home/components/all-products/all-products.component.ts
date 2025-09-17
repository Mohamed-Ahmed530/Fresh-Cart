import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../shared/interFaces/Product';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from "../../../../shared/components/ui/product-item/product-item.component";
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
  selector: 'app-all-products',
  imports: [SearchPipe, FormsModule, ProductItemComponent, NgxPaginationModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit, OnDestroy {
  // Search For Product
  text: WritableSignal<string> = signal('');

  private readonly productsService = inject(ProductsService);

  // products!:Product;  //* 1 solution
  // products:Product = {} as Product ; //* 2 solution
  // products:Product | null = null ;  //* 3 solution
  // products:Product[] = [];  //* 3 solution

  products: WritableSignal<Product[]> = signal<Product[]>([]);

  productSubscription: Subscription = new Subscription();

  pageSize!:number;
  p!:number;
  total!:number;

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData(pageNumber?:number) {
    this.productSubscription = this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.products.set(res.data);

        this.pageSize = res.metadata.limit
        this.p = res.metadata.currentPage
        this.total = res.results
      },
    });
  }


  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
