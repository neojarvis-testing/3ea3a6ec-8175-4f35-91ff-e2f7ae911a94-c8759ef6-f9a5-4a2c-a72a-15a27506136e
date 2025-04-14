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
}
