import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent {
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
  eliminarProducto = new EventEmitter<string>();

  @Output()
  moverACarrito = new EventEmitter<Product>();

  onEliminarProducto(): void {
    this.eliminarProducto.emit(this.product._id);
  }

  onMoverACarrito(): void {
    this.moverACarrito.emit(this.product);
  }

  deleteFromWishList(): void {
    if (this.product && this.userId) {  // Verifica que `product` y `userId` no sean nulos
      this.userService.deleteFromWishList(this.userId, this.product._id).subscribe({
        next: (response) => {
          console.log("Producto eliminado del wishlist:", response);
          alert('Producto eliminado del wishlist');
        },
        error: (err) => {
          console.error("Error al eliminar el wishlist:", err);
          alert('Error al eliminar el wishlist');
        }
      });
    } else {
      console.error('No se puede eliminar el producto del wishlist: Datos insuficientes');
    }
  }

  addToCart(): void {
    if (this.producto && this.userId) {  // Verifica que userId no sea null
      this.userService.addToCart(this.userId, this.product._id).subscribe({
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
}
