import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = '';
  
  private currentUserRole = new BehaviorSubject<string | null>(null);
  private currentUserId = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, login).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.currentUserRole.next(response.userRole);
        this.currentUserId.next(response.userId);
      })
    );
  }
  

  getCurrentUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  getCurrentUserId(): Observable<number | null> {
    return this.currentUserId.asObservable();
  }

  
// getUserIdFromToken(token: string): string | null {
//    // Decode the token and extract the user ID
//    // This is a placeholder implementation. You should use a proper JWT library to decode the token.
//    const payload = JSON.parse(atob(token.split('.')[1]));
//    return payload.userId || null;
//    }
//    getUserRoleFromToken(token: string): string | null {
//     // Decode the token and extract the user role
//     // Ensure proper handling using a JWT library in production
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.userRole || null;
//   }
getUserIdFromToken(token: string | null): string | null {
  if (!token) {
    return null; // Return null if the token is missing
  }
  
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null; // Return null if the token format is invalid
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    return payload?.userId || null; // Return userId if present, otherwise return null
  } catch (error) {
    console.error('Error decoding token:', error);
    return null; // Return null if an error occurs while decoding
  }
}
getUserRoleFromToken(token: string | null): string | null {
  if (!token) {
    return null; // Return null if the token is missing
  }

  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null; // Return null if the token format is invalid
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    return payload?.userRole || null; // Return userRole if present, otherwise return null
  } catch (error) {
    console.error('Error decoding token:', error);
    return null; // Return null if an error occurs while decoding
  }
}

   getToken(): string | null {
    return localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
    this.currentUserRole.next(null);
    this.currentUserId.next(null);

  }


  }
  
