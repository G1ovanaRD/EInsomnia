import { Component, inject } from '@angular/core';
import { CarComponent } from "../car/car.component";
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { CommonModule, NgFor } from '@angular/common';
import { PruebaComponent } from '../prueba/prueba.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CarComponent, NgFor,PruebaComponent,CommonModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  private productService = inject(ProductoService);
  private userService = inject(UserService);
  public selectedProducts: Product[] = []; // Lista de productos seleccionados
  public subtotal: number = 0;
  public userId: string | null = null;
  
  public products: Product[] = []; // Cambiar a una propiedad del componente

  // Mantener el getter si lo necesitas en otras partes
  // public get products(): Product[] {
  //   return this.productService.products;
  // }

  onProductSelected(event: { product: Product; selected: boolean }): void {
    const { product, selected } = event;

    if (selected) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p._id !== product._id);
    }

    this.calculateSubtotal();
  }

  private calculateSubtotal(): void {
    this.subtotal = this.selectedProducts.reduce((sum, product) => sum + product.price, 0);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    
    if (this.userId) {
      // Primero obtener los IDs de productos en el carrito
      this.userService.getCarrito(this.userId).subscribe({
        next: (cartResponse: any) => {
          // Extraer el arreglo de carrito
          const cartProductIds = cartResponse.carrito;
          
          // Filtrar productos del servicio que están en el carrito
          this.products = this.productService.products.filter(product => 
            cartProductIds.includes(product._id)
          );
          
          // Establecer productos seleccionados
          this.selectedProducts = [...this.products];
          
          // Calcular subtotal
          this.calculateSubtotal();
        },
        error: (err) => {
          console.error('Error al obtener carrito:', err);
        }
      });
    }
  }

  eliminarDelCarrito(productId: string): void {
    if (this.userId) {
      this.userService.removeFromCart(this.userId, productId).subscribe({
        next: () => {
          // Actualizar la lista de productos
          this.products = this.products.filter(p => p._id !== productId);
          this.selectedProducts = this.selectedProducts.filter(p => p._id !== productId);
          this.calculateSubtotal();
        },
        error: (err) => {
          console.error('Error al eliminar del carrito:', err);
        }
      });
    }
  }
}