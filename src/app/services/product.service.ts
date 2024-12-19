import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, catchError, throwError } from 'rxjs';
import {product} from './../Models/product.interface'
import { ErrorLogsService } from './error-logs.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';
  http = inject(HttpClient);
  logService = inject(ErrorLogsService)

  getProducts(): Observable<product[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: product): Observable<product> {
    return this.getProducts().pipe(
      map((products) => {
        const maxId = products.reduce((max, emp:any) => Math.max(max, +emp.id), 0);
        product.id = (maxId + 1).toString();
        return product;
      }),
      switchMap((newProduct) =>
        this.http.post<product>(this.apiUrl, newProduct)
      ),catchError((err) => {
        const errorObj = {statusCode: err.status, errorMessage: err.message, datetime: new Date()}
        this.logService.logError(errorObj);
        this.logService.openSnackBar('something went wrong..')
        return throwError(() => err);
    })
    );
  }

  updateProduct(id: string, product: product): Observable<product> {
    return  this.http.put<product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
