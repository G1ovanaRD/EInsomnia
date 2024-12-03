import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { CommonModule, NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-producto',
  imports: [NgFor,CommonModule],
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public producto: Product | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductoService
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
}