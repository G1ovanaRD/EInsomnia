import { Component ,Input} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Product } from '../interface/producto.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-popu',
  standalone: true,
  imports: [MatSidenavModule,CommonModule],
  templateUrl: './popu.component.html',
  styleUrl: './popu.component.css'
})
export class PopuComponent {
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