import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//A classe pode ser injetada em outras classes
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8080/api/products"

  constructor(private snackBar: MatSnackBar, private http:HttpClient) {}
  
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      catchError(e => this.errorHandler(e))
    )
  }
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      catchError(e => this.errorHandler(e))
    )
  }
  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      catchError(e => this.errorHandler(e))
    )
  }
  update(product:Product): Observable<Product> { //Recebendo o produto atualizado
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      catchError(e => this.errorHandler(e))
    ) //Retornando pro Banco
  }
  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      catchError(e => this.errorHandler(e))
    )
  }
  errorHandler(error: any): Observable<any> {
    this.showMessage('Algo deu errado.', true)
    return EMPTY
  }

}

