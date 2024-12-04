import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Comprobar si el token existe
  isTokenValid(): boolean {
    const token = this.getToken();
    if (token) {
      // Aquí puedes verificar si el token ha expirado, por ejemplo, decodificándolo
      // o validando su fecha de expiración. Esto depende del formato de tu token.
      // Si no tienes esa lógica, asumes que el token está presente y es válido.
      return true;
    }
    return false;
  }

  // Eliminar el token si está caducado o en caso de cierre de sesión
  removeToken(): void {
    localStorage.removeItem('jwtToken');
  }
}
