import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [],
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css'
})
export class ProtectedComponent implements OnInit{
  data: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProtectedData().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err) => {
        console.error('Error al acceder a la ruta protegida:', err);
      },
    });
  }
}
