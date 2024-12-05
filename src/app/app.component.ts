import { Component,OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatMenuItem, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { PrincipalComponent } from "./components/principal/principal.component";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProductoService } from './services/producto.service';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor, RouterOutlet, MatMenuModule, MatButtonModule, MenubarModule, PrincipalComponent,RouterOutlet,RouterLink,RouterLinkActive,NgbDropdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'EInsomnia';
  searchTerm: string = '';

  constructor(
    public productoService: ProductoService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.fetchProducts(); // Recargar todos los productos
    localStorage.clear();
  }

  onSearch(event: Event): void {
    event.preventDefault(); // Prevenir la navegación por defecto del enlace
    if (this.searchTerm.trim()) {
      this.productoService.searchProducts(this.searchTerm); // Ejecutar la búsqueda
      this.router.navigate(['/search']); // Navegar manualmente a la página de resultados
      this.searchTerm = ''; // Vaciar el campo de búsqueda
    } else {
      this.productoService.fetchProducts(); // Si no hay término de búsqueda, cargar todos los productos
    }
  }

}

