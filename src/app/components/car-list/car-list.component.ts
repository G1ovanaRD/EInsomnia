import { Component, inject } from '@angular/core';
import { CarComponent } from "../car/car.component";
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { CommonModule, NgFor } from '@angular/common';
import { PruebaComponent } from '../prueba/prueba.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CarComponent, NgFor,PruebaComponent,CommonModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  private productService=inject(ProductoService);
  public selectedProducts: Product[] = []; // Lista de productos seleccionados
  public subtotal: number = 0;
  
  public product: Product[] = []; // Inicializa un arreglo vacío para los productos

  public get products(): Product[]{
    return this.productService.products;
  }

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
}
