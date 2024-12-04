import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {

  public producto: Product | null = null;
  private subscription: Subscription | null = null;
  userId: string| null = null;
  token: string | null = null;
  userRole: string | null = null;

  @Input()
  public product : Product={
    _id:"",
    title: "",
    price: 0,
    description:"",
    image: "",
    category:"",
    marca:"",
    type:"",
    rating:{
      rate:0,
      count:0
    }
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

constructor(
  private route: ActivatedRoute,
  private productService: ProductoService,
  private userService: UserService
) {}

@Output()
  public productSelected: EventEmitter<{ product: Product; selected: boolean }> = new EventEmitter();

  onSelectProduct(event: Event): void {
    const selected = (event.target as HTMLInputElement).checked;
    this.productSelected.emit({ product: this.product, selected });
  }

  deleteFromCart(): void {
    if (this.product && this.userId) {  // Verifica que `product` y `userId` no sean nulos
      this.userService.deleteFromCart(this.userId, this.product._id).subscribe({
        next: (response) => {
          console.log("Producto eliminado del carrito:", response);
          alert('Producto eliminado del carrito');
        },
        error: (err) => {
          console.error("Error al eliminar el producto:", err);
          alert('Error al eliminar el producto');
        }
      });
    } else {
      console.error('No se puede eliminar el producto del carrito: Datos insuficientes');
    }
  }
}