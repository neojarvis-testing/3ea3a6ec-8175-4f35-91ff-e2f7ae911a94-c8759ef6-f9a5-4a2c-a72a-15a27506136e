import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {

  constructor() { }

  appliedLoans: any[] = [];
  searchTerm: string = '';
  selectedLoanId: number | null = null;
  showConfirmPopup: boolean = false;
 
  ngOnInit(): void {
    // Dummy data - replace with service call
    this.appliedLoans = [
      { id: 1, name: 'Demo Loan Type', date: '2024-10-23', status: 'Pending' }
    ];
  }
 
  confirmDelete(id: number): void {
    this.selectedLoanId = id;
    this.showConfirmPopup = true;
  }
 
  deleteLoan(): void {
    if (this.selectedLoanId !== null) {
      this.appliedLoans = this.appliedLoans.filter(loan => loan.id !== this.selectedLoanId);
      this.showConfirmPopup = false;
      this.selectedLoanId = null;
    }
  }
 
  cancelDelete(): void {
    this.showConfirmPopup = false;
    this.selectedLoanId = null;
  }
 
  get filteredLoans() {
    return this.appliedLoans.filter(loan =>
      loan.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}