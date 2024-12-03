import { Component, inject, Input } from '@angular/core';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../interface/producto.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderDetailComponent,NgFor,NgIf],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  private productService=inject(ProductoService);

  public get products(): Product[]{
    return this.productService.products;
  }

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

public isDropdownOpen: boolean = false; // Estado del dropdown

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
