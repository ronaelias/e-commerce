import { Component, OnInit } from '@angular/core'
import { products } from '../dummy-products'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products = products

  constructor() {}

  ngOnInit(): void {}

  updateProductPrice(product: any): void {
    // This method is triggered when the price input changes.
    // You can add custom logic here if needed.
  }

  saveProductPrice(product: any): void {
    // This method is triggered when the "Save" button is clicked.
    console.log(
      `Product ID: ${product.id}, New Price: $${product.price.toFixed(2)}`
    )
    // You can add logic to save the updated price to a server or other storage here.
  }
}
