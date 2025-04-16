import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Login = { Email: '', Password: '' };
  passwordFieldType: string = 'password';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogin(): void {
    if (!this.credentials.Email || !this.credentials.Password) return;
 
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        const role = this.authService.getUserRoleFromToken(response.token);
        localStorage.setItem('userRole', role);
 
        // Navigate based on role
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'User') {
          this.router.navigate(['/']);
        }
 
        alert(`Successfully logged in as ${role}`);
      },
      error: () => {
        alert('Invalid credentials. Please try again.');
      }
    });
  }
 
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}