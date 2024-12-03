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
    private router: Router
  ) {}

  ngOnInit() {}

  onSearch(): void {
    // Llama a tu servicio de búsqueda
    this.productoService.searchProducts(this.searchTerm);
  }

}

