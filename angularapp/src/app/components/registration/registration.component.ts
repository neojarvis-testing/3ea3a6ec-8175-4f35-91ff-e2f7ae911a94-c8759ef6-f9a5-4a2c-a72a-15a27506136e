import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  emailAlreadyExists = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) return;

    const formValue = this.registrationForm.value;

    // Simulate email check
    if (formValue.email === 'existinguser@example.com') {
      this.emailAlreadyExists = true;
    } else {
      this.emailAlreadyExists = false;
      const user: User = {
        Username: formValue.username,
        Email: formValue.email,
        Password: formValue.password,
        MobileNumber: formValue.mobile,
        UserRole: formValue.role
      };
      this.authService.register(user).subscribe(
        (res) => {
          console.log('Registration successful', res);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Registration failed', error);
        }
      );
    }
  }
}
