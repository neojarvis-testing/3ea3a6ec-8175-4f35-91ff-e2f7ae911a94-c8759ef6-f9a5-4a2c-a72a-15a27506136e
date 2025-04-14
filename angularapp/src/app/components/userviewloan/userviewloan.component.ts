import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';
 
@Component({
  selector: 'app-user-view-loan',
  templateUrl: './user-view-loan.component.html',
  styleUrls: ['./user-view-loan.component.css']
})
export class UserViewLoanComponent implements OnInit {
  loans: any[] = [];
  appliedLoans: number[] = []; // store IDs of applied loans
  isLoading = true;
 
  constructor(private loanService: LoanService) {}
 
  ngOnInit(): void {
    this.loadLoans();
  }
 
  loadLoans() {
    this.loanService.getLoans().subscribe(
      (data: any[]) => {
this.loans = data;
        this.appliedLoans = this.loanService.getUserAppliedLoanIds();
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
this.loans = [];
      }
    );
  }
 
  hasApplied(loanId: number): boolean {
    return this.appliedLoans.includes(loanId);
  }
 
  applyForLoan(loanId: number) {
    this.loanService.applyLoan(loanId).subscribe(response => {
      alert('Successfully Applied');
      this.appliedLoans.push(loanId);
    });
  }
}