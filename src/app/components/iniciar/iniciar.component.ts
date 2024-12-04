import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-iniciar',
  standalone: true,
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.css'
})
export class IniciarComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          localStorage.setItem('token', response.token); 
          localStorage.setItem('username', this.username);
          this.errorMessage = null; 
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.errorMessage = error.error.msg || 'Error al iniciar sesión';
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }
}
