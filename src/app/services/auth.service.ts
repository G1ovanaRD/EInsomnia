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
  ){} 

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.userSubject.next(response.user);
          localStorage.setItem('id', response.user._id);
          localStorage.setItem('role', response.user.role);
        })
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    
    this.userSubject.next(null);
    this.router.navigate(['']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }



  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

