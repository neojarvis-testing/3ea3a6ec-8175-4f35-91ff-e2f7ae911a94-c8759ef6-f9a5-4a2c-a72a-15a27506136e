import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';
@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private loanService: LoanService) { }
  user: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };
  loans: Loan[] = [];
  showLoans: boolean = false;
  showLogoutModal: boolean = false;
  errorMessage: string = '';
  Username: string = '';
  ngOnInit(): void {
    this.Username = localStorage.getItem('userName');
  }
  fetchLoans() {
    this.loanService.getAllLoans().subscribe(
      (data) => {
        this.loans = data;
        this.showLoans = true;
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching loans. Please try again later.';
        console.error('Error fetching loans:', error);
      }
    );
  }
  logout() {
    this.showLogoutModal = true;
  }
  confirmLogout() {
    this.showLogoutModal = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  cancelLogout() {
    this.showLogoutModal = false;
  }
}

