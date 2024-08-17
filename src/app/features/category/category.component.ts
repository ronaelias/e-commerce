import { Component, OnInit } from '@angular/core'
import { ProductService } from '../services/product.service'
import { iProduct } from '../../shared/models/product.model'
import { Observable, BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { SearchService } from '../services/search.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: string[] = []

  selectedCategory$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  products$!: Observable<iProduct[]>
  favoriteProducts: Set<number> = new Set<number>()
  cartProducts: Set<number> = new Set<number>()
  selectedCategory: string | null = null

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.products$ = this.selectedCategory$.pipe(
      switchMap((category) =>
        category
          ? this.productService.getProductsByCategory(category)
          : this.productService.getAllProducts()
      )
    )
    this.loadCategories()
  }

  scrollToCategory(category: string) {
    this.selectedCategory = category
    const element = document.getElementById(category)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((categories: string[]) => {
      this.categories = categories
    })
  }

  toggleFavorite(productId: number) {
    if (this.favoriteProducts.has(productId)) {
      this.favoriteProducts.delete(productId)
    } else {
      this.favoriteProducts.add(productId)
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.has(productId)
  }

  toggleCart(productId: number) {
    if (this.cartProducts.has(productId)) {
      this.cartProducts.delete(productId)
    } else {
      this.cartProducts.add(productId)
    }
  }

  isInCart(productId: number): boolean {
    return this.cartProducts.has(productId)
  }
}
