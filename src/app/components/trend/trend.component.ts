import { Component, Input } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trend',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './trend.component.html',
  styleUrl: './trend.component.css'
})
export class TrendComponent {
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
