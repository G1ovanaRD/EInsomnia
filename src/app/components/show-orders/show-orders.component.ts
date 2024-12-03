import { Component, inject } from '@angular/core';
import { OrderComponent } from "../order/order.component";
import { Product } from '../interface/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-show-orders',
  standalone: true,
  imports: [OrderComponent,NgFor],
  templateUrl: './show-orders.component.html',
  styleUrl: './show-orders.component.css'
})
export class ShowOrdersComponent {
  private productService=inject(ProductoService);
  
  public product: Product[] = []; // Inicializa un arreglo vacío para los productos

  public get products(): Product[]{
    return this.productService.products;
  }
}
