import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;

  public cartAddedSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "GetAllProducts");
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "GetAllCategory");
  }

  getProductByCategoryId(catId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + "GetAllProductsByCategoryId?id=" + catId);
  }

  addToCart(obj: any): Observable<any> {
    return this.http.post<any>(this.url + "AddToCart", obj);
  }

  getCartItemsByCustId(custId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + "GetCartProductsByCustomerId?id=" + custId);
  }

  removeCartItemById(cartId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + "DeleteProductFromCartById?id=" + cartId);
  }

  // makeSale(obj: any): Observable<any> {
  //   return this.http.post<any>(this.url + "AddNewSale", obj);
  // }
  placeOrder(obj: any): Observable<any> {
    return this.http.post<any>(this.url + "PlaceOrder", obj);
  }


}
