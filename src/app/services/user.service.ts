import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../components/interface/producto.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:8080/api/user";

    // Agregar un producto al carrito
    addToCart(userId: string, productId: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/${userId}/carrito`, {productId});
    }
  
    addToWishList(userId: string, productId: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/${userId}/wishlist`, {productId});
    }
  
    // Obtener los productos en el carrito de un usuario
     getCarrito(userId: string): Observable<Product[]> {
       return this.http.get<Product[]>(`${this.apiUrl}/${userId}/cart`);
     }

}
