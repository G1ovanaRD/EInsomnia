import { Component, inject } from '@angular/core';
import { ListProductComponent } from "../list-product/list-product.component";
import { ProductFormComponent } from "../product-form/product-form.component";
import { Product } from '../interface/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-show-list-products',
  standalone: true,
  imports: [ListProductComponent, ProductFormComponent,NgFor],
  templateUrl: './show-list-products.component.html',
  styleUrl: './show-list-products.component.css'
})
export class ShowListProductsComponent {
  private productService=inject(ProductoService);
  private route=inject(ActivatedRoute);

  ifFormSubmitted:boolean=false;  
  tipoProducto: string = '';

  ///metodo para eliminar un elemento,se pasa el nombre del elemnto y se hace un filtro y se agregan a la pantalla todos menos ese
  public deleteElement(title:string):void{
    this.productService.deleteElement(title);
  
    //console.log("Evento desde padre");
  }


public createElement(product: Product): void{
  
  //insertar el nuevo elemento show en la lista,pero no se va a mostar en esta seccion
  this.productService.createElement(product);
}

public get products(): Product[] {
    if (this.tipoProducto) {
      // Filtramos los productos por tipo
      return this.productService.products.filter(product => product.type === this.tipoProducto);
    }
    return this.productService.products; // Si no hay filtro, mostramos todos los productos
  }

public get isEditing(): boolean{
  return this.productService.isEditing;
}

public get selectedProduct(): Product | undefined {
  return this.productService.selectedProduct;
}


public updateElement(product: Product): void {
  this.productService.updateElement(product);
}

public selectShowForEdit(product: Product): void {
  this.productService.selectProductForEdit(product);
}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.tipoProducto = params.get('tipo') || ''; // Captura el parámetro `tipo` de la URL
  });
}

}
