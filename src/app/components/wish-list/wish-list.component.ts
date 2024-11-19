import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { inject } from '@angular/core';
import { WishComponent } from '../wish/wish.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [NgFor,WishComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  private productService=inject(ProductoService);
  
  public product: Product[] = []; // Inicializa un arreglo vacío para los productos

  public get products(): Product[]{
    return this.productService.products;
  }
}
