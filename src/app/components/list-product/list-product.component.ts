import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../interface/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule,ProductFormComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})

export class ListProductComponent{
     //compoentne hijo envia informacion al componente padre
     @Output() //deleteCard emisor informacion, <que tipo de evento se va a comnicar ne el evento>
     public deleteCard: EventEmitter<string>=new EventEmitter();
   
     //compartir show al otro form
     @Output()
     public editCard: EventEmitter<Product> = new EventEmitter();
  
  public productos: Product[] = [];
  private subscription: Subscription | null = null;

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductoService
  ) {}


  public get products(): Product[]{
    return this.productService.products;
  }
  

  public isSelect:boolean=false;

  public changeSelected():void{
  this.isSelect =!this.isSelect;

  }

  public onDeleteCard(){
    //console.log("Evento desde el hijo");
    this.deleteCard.emit(this.product._id);
  }

  public onEditCard(): void {
    this.editCard.emit(this.product); 
  }

}
