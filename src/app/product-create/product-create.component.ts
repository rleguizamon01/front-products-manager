import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.sass']
})
export class ProductCreateComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {}

  addProduct(name:string, priceString:string):void{
    name = name.trim();
    if(!name){return;}
    if(!priceString){return;}
    const price = Number(priceString);
    console.log(name + priceString);
    this.productService.addProduct( {name, price} as Product).subscribe();
  }

}
