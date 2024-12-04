import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { inject } from '@angular/core';
import { WishComponent } from '../wish/wish.component';
import { NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [NgFor,WishComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
  private productService = inject(ProductoService);
  private userService = inject(UserService);
  
  public products: Product[] = []; // Lista de productos en wishlist
  public userId: string | null = null;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    
    if (this.userId) {
      this.userService.getWishList(this.userId).subscribe({
        next: (wishlistResponse: any) => {
          // Tu código actual
          const wishlistProductIds = wishlistResponse.wishlist;
          this.products = this.productService.products.filter(product => 
            wishlistProductIds.includes(product._id)
          );
        },
        error: (err) => {
          console.error('Error al obtener wishlist:', err);
          // Agrega estos logs adicionales
          console.log('URL completa:', err.url);
          console.log('Status:', err.status);
          console.log('Detalles del error:', err.error);
        }
      });
    }
  }
  // Método para eliminar de la wishlist
  eliminarDeWishlist(productId: string): void {
    if (this.userId) {
      this.userService.removeFromWishList(this.userId, productId).subscribe({
        next: () => {
          // Actualizar la lista de productos
          this.products = this.products.filter(p => p._id !== productId);
        },
        error: (err) => {
          console.error('Error al eliminar de wishlist:', err);
        }
      });
    }
  }

  // Método para mover de wishlist a carrito
  moverACarrito(product: Product): void {
    if (this.userId) {
      this.userService.addToCart(this.userId, product._id).subscribe({
        next: () => {
          // Eliminar de wishlist
          this.eliminarDeWishlist(product._id);
        },
        error: (err) => {
          console.error('Error al mover a carrito:', err);
        }
      });
    }
  }
}
