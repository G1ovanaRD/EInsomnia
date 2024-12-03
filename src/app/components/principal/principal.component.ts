import { Component, inject ,OnInit} from '@angular/core';
import { PopuComponent } from "../popu/popu.component";
import { RecoComponent } from "../reco/reco.component";
import { TrendComponent } from '../trend/trend.component';
import { Product } from '../interface/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports:[TrendComponent,RecoComponent,PopuComponent,NgFor],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  
  private productService=inject(ProductoService);
  
  public popu: Product[] = []; // Inicializa un arreglo vacío para los productos
  public trend: Product[]=[];

  ngOnInit(): void {
    // Filtra los productos con los IDs que deseas mostrar
    this.popu = this.productService.products.filter(product =>
      ["2", "3", "4","6"].includes(product._id)
    );
    
    this.trend=this.productService.products.filter(product=>["LG","Mabe","HP"].includes(product.marca));
  }

  public get products(): Product[]{
    return this.productService.products;
  }
}
