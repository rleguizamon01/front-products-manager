import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  products : Product[] = [];

  constructor(private productService: ProductService){}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() : void{
    this.productService.getProducts()
    .subscribe(products => this.products = products)
  }

  deleteProduct(product: Product): void{
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product.id).subscribe();
  }

  
}
