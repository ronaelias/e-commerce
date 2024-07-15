import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Product } from '../../product.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchInput = new FormControl();
  products: Product[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),  // Wait for the user to stop typing for 300ms
      distinctUntilChanged(),  // Only trigger when the input value changes
      switchMap(query => this.searchService.searchProducts(query))  // Switch to new search observable
    ).subscribe(
      products => this.products = products,
      error => console.error(error)  // Handle potential errors
    );
  }
}
