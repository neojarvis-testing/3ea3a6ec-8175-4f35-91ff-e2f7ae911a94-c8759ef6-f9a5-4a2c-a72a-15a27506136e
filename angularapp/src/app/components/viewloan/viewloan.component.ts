import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
 
@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {
  loans: any[] = [];
  filteredLoans: any[] = [];
  searchTerm: string = '';
 
  constructor(private loanService: LoanService, private router: Router) { }
 
  ngOnInit(): void {
    this.getAllLoans();
  }
 
  getAllLoans(): void {
    this.loanService.getAllLoans().subscribe(
      data => {
        this.loans = data;
        this.filteredLoans = [...this.loans];
      },
      error => {
        console.error('Error fetching loans', error);
      }
    );
  }
 
  search(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredLoans = this.loans.filter(loan =>
      loan.loanType.toLowerCase().includes(term) || loan.description.toLowerCase().includes(term)
    );
  }
 
  editLoan(id: number): void {
    this.router.navigate(['/admineditloan', id]);
  }
 
  deleteLoan(id: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.loanService.deleteLoan(id).subscribe(
        res => {
          alert('Loan deleted successfully');
          this.getAllLoans();
        },
        err => {
          if (err.error?.message?.includes('referenced')) {
            alert('Loan cannot be deleted, it is referenced in loan application');
          } else {
            console.error('Delete error:', err);
          }
        }
      );
    }
  }
}
