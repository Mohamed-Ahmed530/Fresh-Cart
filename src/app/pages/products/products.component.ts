import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../shared/interFaces/Product';
import { ProductItemComponent } from '../../shared/components/ui/product-item/product-item.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
  selector: 'app-products',
  imports: [SearchPipe, FormsModule, ProductItemComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent{

  // Search For Product
  text: WritableSignal<string> = signal('');

  private readonly productsService = inject(ProductsService);

  products: WritableSignal<Product[]> = signal<Product[]>([]);

  pageSize!:number;
  p!:number;
  total!:number;

  productSubscription: Subscription = new Subscription();

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