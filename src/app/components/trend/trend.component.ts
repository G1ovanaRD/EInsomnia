import { Component, Input } from '@angular/core';
import { Product } from '../interface/producto.interface';

@Component({
  selector: 'app-trend',
  standalone: true,
  imports: [],
  templateUrl: './trend.component.html',
  styleUrl: './trend.component.css'
})
export class TrendComponent {
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
