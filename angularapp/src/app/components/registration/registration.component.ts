import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'; // Import SweetAlert2
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobileNumber: string = '';
  userRole: string = '';
  passwordFieldType: string = 'password'; 
  confirmPasswordFieldType: string = 'password';
  adminCode: string = 'ZINC2025';
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void { }
  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (this.userRole === 'Admin') {
      Swal.fire({
        title: 'Enter the code',
        input: 'text',
        inputLabel: 'Please enter the code for Admin',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to enter a code!';
          } else if (value !== this.adminCode) {
            return 'Invalid code!';
          }
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          this.completeRegistration();
        }
      });
    } else {
      this.completeRegistration();
    }
  }
  completeRegistration() {
    const registrationData = {
      Username: this.username,
      Email: this.email,
      Password: this.password,
      MobileNumber: this.mobileNumber,
      UserRole: this.userRole // Update to match expected backend field
    };
    console.log('Registration Data:', JSON.stringify(registrationData, null, 2)); // Detailed log
    console.log('Role Value:', this.userRole);
    this.authService.register(registrationData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        Swal.fire({
          title: 'Registration Successful',
          text: 'You have successfully registered!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error('Registration failed', err);
        if (err.error && err.error.errors) {
          console.log('Validation Errors:', err.error.errors);
          alert(`Registration failed: ${JSON.stringify(err.error.errors)}`);
        } else {
          alert('Registration failed. Please check your input and try again.');
        }
      }
    });
  }
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }
}
