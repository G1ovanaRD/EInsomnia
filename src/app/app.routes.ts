import { Routes} from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { SmartphoneComponent } from './components/smartphone/smartphone.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent}, // Página principal
    { path: 'smartphones', component: SmartphoneComponent }, // Página para smartphones
    // otras rutas...
  ];
