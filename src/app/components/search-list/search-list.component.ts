import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../interface/producto.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,RouterLink],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.css'
})
export class SearchListComponent {
  products$: Observable<Product[]>;

  constructor(public productoService: ProductoService) {
    // Vinculamos el observable al servicio
    this.products$ = this.productoService.products$;
  }
  

}
