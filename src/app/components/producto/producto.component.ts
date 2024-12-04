import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { CommonModule, NgFor } from '@angular/common';
import { Subscription } from 'rxjs';  
import { UserService } from '../../services/user.service';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-producto',
  imports: [NgFor,CommonModule,RouterLink],
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public producto: Product | null = null;
  product!: Product;
  private subscription: Subscription | null = null;
  userId: string| null = null;
  token: string | null = null;
  userRole: string | null = null;
  
  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductoService,
    private userService: UserService
  ) {}

@Output()
public eliminarProducto: EventEmitter<void> = new EventEmitter();

onEliminarProducto(): void {
  this.eliminarProducto.emit();
}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('id');
    this.userRole = localStorage.getItem('role');
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
  if (this.producto && this.userId) {  // Verifica que userId no sea null
    this.userService.addToCart(this.userId, this.producto._id).subscribe({
      next: (response) => {
        console.log("Producto agregado al carrito:", response);
        // Opcional: Mostrar un mensaje al usuario
      },
      error: (err) => {
        console.error("Error al agregar al carrito:", err);
      }
    });
  } else {
    console.error('No se puede agregar al carrito, el userId o el producto no están disponibles');
  }
}

addToWishList(): void {
  if (this.producto && this.userId) {  // Verifica que userId no sea null
    this.userService.addToWishList(this.userId, this.producto._id).subscribe({
      next: (response) => {
        console.log("Producto agregado a la Wishlist:", response);
        // Opcional: Mostrar un mensaje al usuario
      },
      error: (err) => {
        console.error("Error al agregar a la wishlist:", err);
      }
    });
  } else {
    console.error('No se puede agregar a la wishlist, el userId o el producto no están disponibles');
  }
}


}