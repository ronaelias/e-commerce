import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-listing/services/product.service';
import { Product } from '../../product.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories = [
    'men\'s clothing',
    'jewelery',
    'electronics',
    'women\'s clothing'
  ];

  selectedCategory$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.selectedCategory$.pipe(
      switchMap(category => 
        category ? this.productService.getProductsByCategory(category) : this.productService.getAllProducts()
      )
    );
  }

  onCategorySelect(category: string) {
    this.selectedCategory$.next(category);
  }
}
