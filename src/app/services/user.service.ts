import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../components/interface/producto.interface';
import { User } from '../components/interface/user.interface';
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
    getCarrito(userId: string): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/${userId}/cart`);
    }

     removeFromCart(userId: string, productId: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${userId}/carrito/${productId}`);
    }


        // Obtener los productos en la wishlist de un usuario
    getWishList(userId: string): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/${userId}/wishlist`);
    }

    // Eliminar de wishlist
    removeFromWishList(userId: string, productId: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${userId}/wishlist/${productId}`);
    }

    deleteFromCart(userId: string, productId: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${userId}/carrito`, { body: { productId } });
    }
}
