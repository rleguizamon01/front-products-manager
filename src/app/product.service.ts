import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly ROOT_URL = 'https://back-products-manager.herokuapp.com/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
    ){}

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.ROOT_URL + 'products');
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(this.ROOT_URL + 'products/show/' + id);
  }

  addProduct(product : Product): Observable<Product>{
    console.log(product);
    return this.http.post<Product>(this.ROOT_URL + 'products/store', product, this.httpOptions).pipe(
      tap(_ => console.log(`created product`)),
      catchError(this.handleError<Product>('createdProduct'))
    );
    
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(this.ROOT_URL + 'products/delete/' + id);
  }

  updateProduct(product: Product, id: number): Observable<any>{
    console.log(product);
    return this.http.put(this.ROOT_URL + 'products/update/' + id, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
