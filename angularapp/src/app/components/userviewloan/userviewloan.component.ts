import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';
import { LoanApplication } from 'src/app/models/loanapplication.model';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserViewLoanComponent implements OnInit {
  loans: Loan[] = []; // Array of Loan objects
  appliedLoans: LoanApplication[] = []; // Array of LoanApplication objects
  isLoading = true;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadLoans(); // Load loans on component initialization
  }

  loadLoans(): void {
    const userId = Number(localStorage.getItem('userId')); // Retrieve the userId from localStorage

    // Fetch all loans
    this.loanService.getAllLoans().subscribe(
      (data: Loan[]) => {
        this.loans = data; // Populate loans array
        // Fetch applied loans for the current user
        this.loanService.getAppliedLoans(userId).subscribe(
          (appliedData: LoanApplication[]) => {
            this.appliedLoans = appliedData; // Populate applied loans array
            this.isLoading = false; // Stop loading spinner
          },
          (error) => {
            this.isLoading = false;
            console.error('Error fetching applied loans:', error);
          }
        );
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching loans:', error);
        this.loans = []; // Reset loans array
      }
    );
  }

  hasApplied(loanId: number): boolean {
    // Check if the loanId exists in the applied loans
    return this.appliedLoans.some((appliedLoan) => appliedLoan.LoanId === loanId);
  }

  applyForLoan(loanId: number): void {
    const userId = Number(localStorage.getItem('userId')); // Retrieve the userId from localStorage
    const loanApplication: LoanApplication = {
      LoanId: loanId, UserId: userId,
      SubmissionDate: '',
      LoanStatus: 0,
      FarmLocation: '',
      FarmerAddress: '',
      FarmSizeInAcres: 0,
      FarmPurpose: '',
      File: ''
    };

    // Apply for a loan
    this.loanService.addLoanApplication(loanApplication).subscribe(
      (response) => {
        alert('Successfully Applied');
        this.appliedLoans.push(loanApplication); // Add the new application to the applied loans array
      },
      (error) => {
        console.error('Error applying for loan:', error);
        alert('Failed to apply for loan');
      }
    );
  }
}