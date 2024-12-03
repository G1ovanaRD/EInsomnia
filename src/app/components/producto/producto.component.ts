import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { CommonModule, NgFor } from '@angular/common';
import { Subscription } from 'rxjs';  
import { UserService } from '../../services/user.service';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-producto',
  imports: [NgFor,CommonModule],
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public producto: Product | null = null;
  product!: Product;
  private subscription: Subscription | null = null;
  userId = '674c000d33079de2ec8a3e39';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductoService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const _id = params.get('_id');
      if (_id) {
        // Encuentra el producto por ID en lugar de filtrar
        this.producto = this.productService.products.find(
          product => product._id === String(_id)
        ) || null;
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

 // producto.component.ts
addToCart(): void {
  if (this.producto) {
    this.userService.addToCart(this.userId, this.producto._id).subscribe({
      next: (response) => {
        console.log("Producto agregado al carrito:", response);
        // Opcional: Mostrar un mensaje al usuario
      },
      error: (err) => {
        console.error("Error al agregar al carrito:", err);
      }
    });
  }
}

  
}