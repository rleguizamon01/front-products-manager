import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {

  product: Product | undefined;
  productIdFromRoute : number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = Number(routeParams.get('productId'));

    this.productService.getProduct(this.productIdFromRoute)
    .subscribe(product => this.product = product);
  }

  editProduct(name:string, priceString:string):void{
    name = name.trim();
    if(!name){return;}
    if(!priceString){return;}
    const price = Number(priceString);
    console.log(name+priceString);
    this.productService.updateProduct( {name, price} as Product, this.productIdFromRoute).subscribe();
  }

}
