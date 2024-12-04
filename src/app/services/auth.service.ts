import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
// import { User } from '../components/interface/user.interface';

interface AuthResponse {
  msg: string;
  token: string;
  user: User;
}


interface User {
  username: string;
  role: string;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkToken();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.userSubject.next(response.user);
        })
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      // You might want to validate the token with the backend here
      // For now, we'll just set the user from the stored data
      try {
        const userData = JSON.parse(atob(token.split('.')[1]));
        this.http.get<User>(`${this.apiUrl}/users/${userData.username}`).subscribe(
          user => this.userSubject.next(user)
        );
      } catch (e) {
        this.logout();
      }
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

