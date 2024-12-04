import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
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

@Output()
  public productSelected: EventEmitter<{ product: Product; selected: boolean }> = new EventEmitter();

  onSelectProduct(event: Event): void {
    const selected = (event.target as HTMLInputElement).checked;
    this.productSelected.emit({ product: this.product, selected });
  }
}
