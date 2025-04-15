import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };
  confirmPassword: string = '';
  submitted: boolean = false;
  emailAlreadyExists: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  // Custom validation for password matching
  passwordsMatch(): boolean {
    return this.user.Password === this.confirmPassword;
  }
 
  onSubmit(registrationForm: any): void {
    this.submitted = true;
 
    if (registrationForm.invalid || !this.passwordsMatch()) {
      return; // Prevent form submission if invalid
    }
 
    if (this.user.Email === 'existinguser@example.com') {
      // Simulate email existence check
      this.emailAlreadyExists = true;
    } else {
      this.emailAlreadyExists = false;
 
      this.authService.register(this.user).subscribe({
        next: () => {
          console.log('Registration successful');
          this.router.navigate(['/login']); // Navigate to login page upon success
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }
}