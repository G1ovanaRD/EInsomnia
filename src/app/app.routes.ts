import { Routes} from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { SmartphoneComponent } from './components/smartphone/smartphone.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ListProductComponent } from './components/list-product/list-product.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent}, // Página principal
    { path: 'smartphones', component: SmartphoneComponent }, // Página para smartphones
    { path: 'producto/:id', component: ProductoComponent },
    { path: 'productos/:tipo', component: ListProductComponent}
    // otras rutas...
  ];
