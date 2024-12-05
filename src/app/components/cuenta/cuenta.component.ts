import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent {
  public userId: string | null = null;
  public username: string | null = null;

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.username = localStorage.getItem('username');
    
    }


}
