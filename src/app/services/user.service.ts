import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../components/interface/producto.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:8080/api/";


  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/wishlist/add/${productId}`, {});
  }

  // Eliminar producto del wishlist
  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/wishlist/remove/${productId}`);
  }

  addToCart(userId: string, productId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/cart`, { productId });
  }
  // Eliminar producto del carrito
  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/cart/remove/${productId}`);
  }

  // Obtener los productos en el carrito
  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/user/cart`);
  }
}
