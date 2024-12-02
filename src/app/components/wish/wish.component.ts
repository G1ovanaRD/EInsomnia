import { Component } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent {
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
