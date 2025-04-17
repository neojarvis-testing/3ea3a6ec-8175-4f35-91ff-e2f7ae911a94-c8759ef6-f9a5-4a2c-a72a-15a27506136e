// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { User } from '../models/user.model';
// import { Login } from '../models/login.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   public apiUrl = 'https://ide-beebacfeedbecdbedbbccdbfcaceffaacaaae.premiumproject.examly.io/proxy/8080/api';
  
//   private currentUserRole = new BehaviorSubject<string | null>(null);
//   private currentUserId = new BehaviorSubject<number | null>(null);

//   constructor(private http: HttpClient) {}

//   // register(user: User): Observable<any> {
//   //   return this.http.post(`${this.apiUrl}/register`, user);
//   // }
//   register(newUser: User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/register`, newUser);
//   }

//   login(login: Login): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, login).pipe(
//       tap((response: any) => {
//         localStorage.setItem('token', response.token);
//         this.currentUserRole.next(response.userRole);
//         this.currentUserId.next(response.userId);
//       })
//     );
//   }
  

//   getCurrentUserRole(): Observable<string | null> {
//     return this.currentUserRole.asObservable();
//   }

//   getCurrentUserId(): Observable<number | null> {
//     return this.currentUserId.asObservable();
//   }

  
// // getUserIdFromToken(token: string): string | null {
// //    // Decode the token and extract the user ID
// //    // This is a placeholder implementation. You should use a proper JWT library to decode the token.
// //    const payload = JSON.parse(atob(token.split('.')[1]));
// //    return payload.userId || null;
// //    }
// //    getUserRoleFromToken(token: string): string | null {
// //     // Decode the token and extract the user role
// //     // Ensure proper handling using a JWT library in production
// //     const payload = JSON.parse(atob(token.split('.')[1]));
// //     return payload.userRole || null;
// //   }
// getUserIdFromToken(token: string | null): string | null {
//   if (!token) {
//     return null; // Return null if the token is missing
//   }
  
//   try {
//     const tokenParts = token.split('.');
//     if (tokenParts.length !== 3) {
//       return null; // Return null if the token format is invalid
//     }

//     const payload = JSON.parse(atob(tokenParts[1]));
//     return payload?.userId || null; // Return userId if present, otherwise return null
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null; // Return null if an error occurs while decoding
//   }
// }
// getUserRoleFromToken(token: string | null): string | null {
//   if (!token) {
//     return null; // Return null if the token is missing
//   }

//   try {
//     const tokenParts = token.split('.');
//     if (tokenParts.length !== 3) {
//       return null; // Return null if the token format is invalid
//     }

//     const payload = JSON.parse(atob(tokenParts[1]));
//     return payload?.userRole || null; // Return userRole if present, otherwise return null
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null; // Return null if an error occurs while decoding
//   }
// }

//    getToken(): string | null {
//     return localStorage.getItem('token');
//   }
//   logout(): void {
//     localStorage.removeItem('token');
//     this.currentUserRole.next(null);
//     this.currentUserId.next(null);

//   }


//   }

import { Injectable, Optional } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = environment.apiUrl;
  private currentUserRole = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserRole.next(this.getUserRoleFromToken(token));
    }
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/api/login`, credentials).subscribe( // Ensure this URL matches your backend endpoint
        response => {
          localStorage.setItem('token', response.token);
          const role = this.getUserRoleFromToken(response.token);
          const userId = this.getUserIdFromToken(response.token);
          const userName = this.getUserNameFromToken(response.token);
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          this.currentUserRole.next(role);
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.currentUserRole.next(null);
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }
  getUserRoleFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return role || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getUserIdFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      return userId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getUserNameFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      return userId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getCurrentUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'Admin';
  }
  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'User';
  }
}

