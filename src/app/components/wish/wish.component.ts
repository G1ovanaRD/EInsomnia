import { Component } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { Input } from '@angular/core';
@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent {
  @Input()
    public product : Product={
      id:0,
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
