import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../interface/producto.interface';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule,NgIf, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() public createElement: EventEmitter<Product> = new EventEmitter();
  @Output() public updateElement: EventEmitter<Product> = new EventEmitter();
  @Input() public product?: Product;
  @Input() public isEdit: boolean = false;
  userRole: string | null = null;


  constructor( public authService: AuthService){};

  ngOnInit(): void {

    this.userRole = localStorage.getItem('role');
    console.log(this.userRole);

  }

  public isAdmin(): boolean {
    return this.userRole === 'admin'; 
  }
  
  public onFormSubmit(form: NgForm): void {
    if (form.valid) {
      const updatedProduct: Product = {
        _id: this.product?._id || "",  // Para asegurarse de mantener el ID si estamos editando
        title: form.value.name,
        description: form.value.description,
        image: form.value.image,
        type: form.value.type,
        price: form.value.price,  // Puedes ajustarlo según el formulario
        category: form.value.category,  // Si lo tienes en el formulario
        marca: form.value.marca,  // Si lo tienes en el formulario
        rating: { rate: form.value.rate, count: form.value.count}  // Definir valores por defecto
      };

      if (this.isEdit) {
        this.updateElement.emit(updatedProduct);  // Emitir evento de actualización
      } else {
        this.createElement.emit(updatedProduct);  // Emitir evento de creación
      }

      form.resetForm();
      this.isEdit=false;
    } else {
      console.log("Faltan datos");
    }
  }
}
