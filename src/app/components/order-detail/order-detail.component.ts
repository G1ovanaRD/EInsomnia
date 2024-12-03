import { Component, inject, Input } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
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
}
