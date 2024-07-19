import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../search.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
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
