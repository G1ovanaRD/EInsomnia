import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule,RouterLink, CommonModule, NgIf],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  errorMessage: string | null = null;

  newUsername: string = '';
  newPassword: string = '';
  registrationError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    console.log('Registro con:', this.newUsername, this.newPassword);
  
    if (!this.newUsername || !this.newPassword) {
      this.registrationError = 'Por favor, complete todos los campos';
      return;
    }

    this.authService.register(this.newUsername, this.newPassword).subscribe(
      response => {
        console.log('Usuario registrado con éxito:', response);
        this.registrationError = "Usuario Registrado con éxito";
        this.router.navigate(['/iniciar']);
      },
      error => {
        console.error('Error al registrar el usuario:', error);
        if (error.status === 400 && error.error.msg === 'Username ya existente') {
          this.registrationError = 'El nombre de usuario ya está registrado. Intenta con otro.';
        } else {
          this.registrationError = 'Hubo un error al registrar el usuario. Intenta nuevamente.';
        }
      }
    );
  }

}
