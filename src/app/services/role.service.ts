import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor() {}

  getRole(): string | null {
    return localStorage.getItem('role'); // Lee el rol desde el localStorage
  }

  isUserOrAdmin(): boolean {
    const role = this.getRole();
    return role === 'user' || role === 'admin';
  }
}
