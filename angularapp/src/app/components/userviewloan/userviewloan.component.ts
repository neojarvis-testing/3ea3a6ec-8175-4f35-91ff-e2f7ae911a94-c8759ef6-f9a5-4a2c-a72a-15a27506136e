import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoanService } from 'src/app/services/loan.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {
  Loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  appliedLoanIds: number[] = [];
  userId: number;
  searchTerm: string = '';
  // Pagination variables
  currentPage: number = 1;
  loansPerPage: number = 5;
  constructor(
    private loanService: LoanService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = Number(this.authService.getUserIdFromToken(localStorage.getItem('token') || ''));
  }
  ngOnInit(): void {
    this.loadLoans();
    this.loadAppliedLoans();
  }
  loadLoans(): void {
    Swal.fire({
      title: 'Loading loans...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loading spinner
      }
    });  
    this.loanService.getAllLoans().subscribe(
      (data) => {
        this.Loans= data;
        this.updateFilteredLoans();
        Swal.close();
      },
      (error) => {
        console.error('Error fetching loans:', error);
        Swal.close(); // Close spinner on error
      Swal.fire('Error', 'No Loans to Load.', 'error');
      }
    );
  }
  loadAppliedLoans(): void {
    this.loanService.getAppliedLoans(this.userId).subscribe(
      (requests) => {
        this.appliedLoanIds = requests.map(request => request.LoanId);
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }
  applyForLoan(loanId: number): void {
    if (!this.appliedLoanIds.includes(loanId)) {
      localStorage.setItem("LoanId", loanId.toString());
      this.appliedLoanIds.push(loanId); // Add the loanId to the appliedLoanIds array immediately
      this.router.navigate(['/loanform']);
    }
  }
  isLoanApplied(loanId: number): boolean {
    return this.appliedLoanIds.includes(loanId);
  }
  searchLoans(): void {
    this.currentPage = 1;
    this.updateFilteredLoans();
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.updateFilteredLoans();
  }
  updateFilteredLoans(): void {
    let filtered = this.Loans;
    if (this.searchTerm) {
      filtered = filtered.filter(c => {
        const LoanTypeMatch = c.LoanType.toLowerCase().includes(this.searchTerm.toLowerCase());
        const DescriptionMatch = c.Description.toLowerCase().includes(this.searchTerm.toLowerCase());
        const EligibilityMatch = c.Eligibility.toLowerCase().includes(this.searchTerm.toLowerCase());
        return LoanTypeMatch || DescriptionMatch || EligibilityMatch;
      });
    }
    const startIndex = (this.currentPage - 1) * this.loansPerPage;
    const endIndex = startIndex + this.loansPerPage;
    this.filteredLoans = filtered.slice(startIndex, endIndex);
  }
  getTotalPages(): number {
    return Math.ceil(this.Loans.length / this.loansPerPage);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredLoans();
    }
  }
  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateFilteredLoans();
    }
  }
}
