import { Routes} from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { SmartphoneComponent } from './components/smartphone/smartphone.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { WishComponent } from './components/wish/wish.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarComponent } from './components/car/car.component';
import { ShowListProductsComponent } from './components/show-list-products/show-list-products.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { IniciarComponent} from './components/iniciar/iniciar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { OrderComponent } from './components/order/order.component';


export const routes: Routes = [
    { path: '', component: PrincipalComponent}, // Página principal
    { path: 'smartphones', component: SmartphoneComponent }, // Página para smartphones
    { path: 'producto/:_id', component: ProductoComponent },
    { path: 'cuenta', component: CuentaComponent },
    { path: 'productos/:tipo', component: ShowListProductsComponent},
    { path: 'prodMar/:marca', component: ShowListProductsComponent },
    { path: 'wish-list', component: WishListComponent },
    { path: 'wish', component: WishComponent },// otras rutas...
    { path: 'car-list',component: CarListComponent},
    {path: 'car', component: CarComponent},
    {path:'show-products', component: ShowListProductsComponent},
    {path: 'search', component:SearchListComponent},
    { path: 'iniciar', component:IniciarComponent},
    {path:'registrar',component: RegistrarComponent},
    {path: 'show-orders', component: ShowOrdersComponent},
    {path: 'order', component: OrderComponent},
];
