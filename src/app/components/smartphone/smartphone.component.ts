import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-smartphone',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './smartphone.component.html',
  styleUrl: './smartphone.component.css'
})
export class SmartphoneComponent implements OnInit {

  private productService=inject(ProductoService);
  
  public smart: Product[] = []; // rreglo de smartphones vacio

  ngOnInit(): void {
    this.smart=this.productService.products.filter(product=>["Smartphone"].includes(product.type));
  }
}
