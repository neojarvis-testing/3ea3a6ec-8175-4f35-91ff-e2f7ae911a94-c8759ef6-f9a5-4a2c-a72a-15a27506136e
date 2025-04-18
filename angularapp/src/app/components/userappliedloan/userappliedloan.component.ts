import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {

  loanApplication : LoanApplication ={
    SubmissionDate: new Date().toISOString(),
    LoanStatus: 0,
    FarmLocation: '',
    FarmerAddress: '',
    FarmSizeInAcres: 0,
    FarmPurpose: '',
    File: ''
  }

  loanApplicationList : LoanApplication[] = [];
  filteredLoans: LoanApplication[] = [];
  paginatedLoans: LoanApplication[] = [];
  showDeleteModal:boolean = false;
  localDelteVar : number = 0;
  userId = +(localStorage.getItem('userId'));
  showViewModal : boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';

  constructor(private loanApp : LoanService, private router : Router) { }

  ngOnInit(): void {
    this.fetchAlloanApplicationsOfUser();
  }

  fetchAlloanApplicationsOfUser(){
    Swal.fire({
      title: 'Loading your loan applications...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loading spinner
      }
    });  
    this.loanApp.getAppliedLoans(this.userId).subscribe(d=>{
      this.loanApplicationList = d;
      this.filteredLoans = d;
      this.updatePagination();
      Swal.close();
    },
    (error) => {
      Swal.close(); // Close the spinner in case of an error
      Swal.fire('Error', 'No Loan Application to load.', 'error');
    }
);
  }
  searchLoans(): void {
    if (this.searchTerm) {
      this.filteredLoans = this.loanApplicationList.filter(c =>
        c.Loan.LoanType.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredLoans = [...this.loanApplicationList];
    }
    this.updatePagination();
  }
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLoans = this.filteredLoans.slice(startIndex, endIndex);
  }
  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filteredLoans.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  getTotalPages(): number {
    return Math.ceil(this.filteredLoans.length / this.itemsPerPage);
  }

  viewLoan(id:number){
    this.showViewModal = true;
    console.log(id);
    this.loanApplication = this.loanApplicationList.find(l=>
      l.LoanApplicationId == id
      
    )
  }


  confirmDelete(loanId:number): void{
    this.localDelteVar = loanId;
    this.showDeleteModal = true;
  }

  deleteLoan(): void{
    if(this.localDelteVar !== null){
      this.loanApp.deleteLoanApplication(this.localDelteVar).subscribe({
        next: () => {
          this.fetchAlloanApplicationsOfUser();
          this.closeDeleteModal();
        }
      });
    }
  }
  closeDeleteModal(): void{
    this.showDeleteModal = false;
    this.localDelteVar = null;
  }

  closeviewModal(){
    this.showViewModal = false;
  }

  getStatus(loanStatus: number): string {
    switch (loanStatus) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approved';
      case 2:
        return 'Rejected';
    }
  }
}

