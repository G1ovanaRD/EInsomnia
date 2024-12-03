import { Component, Input } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-reco',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink],
  templateUrl: './reco.component.html',
  styleUrl: './reco.component.css'
})
export class RecoComponent {
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
