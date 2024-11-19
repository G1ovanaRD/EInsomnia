import { Component, OnInit } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{
  public productos: Product[] = [];
  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductoService
  ) {}



  ngOnInit(): void {
    // Suscribirse a los cambios en el parámetro de ruta
    this.subscription = this.route.paramMap.subscribe(params => {
      const tipo = params.get('tipo');
      const marca = params.get('marca');
      if (tipo) {
        this.productos = this.productService.products.filter(
          product => product.type === tipo
        );
      }else if(marca){
        this.productos = this.productService.products.filter(
          product=>product.marca==marca
        );
      }



    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción cuando el componente se destruye
    this.subscription?.unsubscribe();
  }
}
