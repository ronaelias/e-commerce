import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../search.service';
import { ProductService } from '../../../product-listing/services/product.service';
import { Product } from '../../../../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService, private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.searchService.setProducts(products);
    });

    this.searchService.searchProducts('').subscribe((products: Product[]) => {
      this.filteredProducts = products;
    });

    this.searchService.searchQuery$.subscribe(query => {
      this.searchService.searchProducts(query).subscribe((products: Product[]) => {
        this.filteredProducts = products;
      });
    });
  }
  
}
