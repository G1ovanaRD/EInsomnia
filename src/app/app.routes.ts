import { Routes} from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { SmartphoneComponent } from './components/smartphone/smartphone.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { WishComponent } from './components/wish/wish.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent}, // Página principal
    { path: 'smartphones', component: SmartphoneComponent }, // Página para smartphones
    { path: 'producto/:id', component: ProductoComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: 'productos/:tipo', component: ListProductComponent},
    { path: 'prodMar/:marca', component: ListProductComponent },
    { path: 'wish-list', component: WishListComponent },
    { path: 'wish', component: WishComponent }// otras rutas...
];
