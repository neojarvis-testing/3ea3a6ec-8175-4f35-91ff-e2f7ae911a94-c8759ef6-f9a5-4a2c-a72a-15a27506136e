import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  passwordFieldType: string = 'password';
  constructor(private authService: AuthService, private router: Router) { }
  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        const role = this.authService.getUserRoleFromToken(response.token);
        localStorage.setItem('userRole', role);
  
        // Navigate to the role-specific route
        if (role) {
          if (role.toLowerCase() === 'admin') {
            this.router.navigate(['/home']); // Ensure the role matches the route path
          } else if (role.toLowerCase() === 'user') {
            this.router.navigate(['/home']); // Make sure the User route is correct
          }
          Swal.fire({
            title: 'Success!',
            text: `Successfully logged in as ${role}`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          this.router.navigate(['/error']); // Fallback route
        }
      },
      error: () => {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid credentials. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
    });
  }
  
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
