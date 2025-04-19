// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Loan } from 'src/app/models/loan.model';
// import { LoanService } from 'src/app/services/loan.service';
// import Swal from 'sweetalert2';
// @Component({
//   selector: 'app-viewloan',
//   templateUrl: './viewloan.component.html',
//   styleUrls: ['./viewloan.component.css']
// })
// export class ViewloanComponent implements OnInit {
//   loans: Loan[] = [];
//   filteredLoans: Loan[] = [];
//   paginatedLoans: Loan[] = [];
//   searchTerm: string = '';
//   showDeleteModal: boolean = false;
//   showErrorModal: boolean = false;
//   loanToDelete: number | null = null;
//   errorMessage: string = '';
//   currentPage: number = 1;
//   itemsPerPage: number = 10;
//   constructor(private loanService: LoanService, private router: Router) { }
//   ngOnInit(): void {
//     this.loadLoans();
//   }
//   loadLoans(): void {
//     Swal.fire({
//       title: 'Loading loans...',
//       text: 'Please wait',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });  
//     this.loanService.getAllLoans().subscribe(loans => {
//       this.loans = loans;
//       this.filteredLoans = loans;
//       this.updatePagination();
//       Swal.close();
//     },
//     (error) => {
//       Swal.close(); // Close spinner in case of error
//       Swal.fire('Error', 'No Loans to load.', 'error');
//     });
//   }
//   searchLoans(): void {
//     if (this.searchTerm) {
//       this.filteredLoans = this.loans.filter(c =>
//         c.LoanType.toLowerCase().includes(this.searchTerm.toLowerCase())
//       );
//     } else {
//       this.filteredLoans = [...this.loans];
//     }
//     this.updatePagination();
//   }
//   updatePagination(): void {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     this.paginatedLoans = this.filteredLoans.slice(startIndex, endIndex);
//   }
//   nextPage(): void {
//     if ((this.currentPage * this.itemsPerPage) < this.filteredLoans.length) {
//       this.currentPage++;
//       this.updatePagination();
//     }
//   }
//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.updatePagination();
//     }
//   }
//   getTotalPages(): number {
//     return Math.ceil(this.filteredLoans.length / this.itemsPerPage);
//   }
//   editLoan(loanId: number): void {
//     this.router.navigate([`/admineditloan/${loanId}`]);
//   }
//   confirmDelete(loanId: number): void {
//     this.loanToDelete = loanId;
//     this.showDeleteModal = true;
//   }
//   deleteLoan(): void {
//     if (this.loanToDelete !== null) {
//       this.loanService.deleteLoan(this.loanToDelete).subscribe({
//         next: () => {
//           this.loadLoans();
//           this.closeDeleteModal();
//         },
//         error: (error) => {
//           // this.errorMessage = error.error.Message || "An error occurred while deleting the loan.";
//           this.errorMessage = error.error.Message || "This loan cannot be deleted as a user has already applied for it.";
//           this.showErrorModal = true;
//         }
//       });
//     }
//   }
//   closeDeleteModal(): void {
//     this.showDeleteModal = false;
//     this.loanToDelete = null;
//   }
//   closeErrorModal(): void {
//     this.showErrorModal = false;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  paginatedLoans: Loan[] = [];
  searchTerm: string = '';
  showDeleteModal: boolean = false;
  showErrorModal: boolean = false;
  loanToDelete: number | null = null;
  errorMessage: string = '';
  nonDeletableLoanIds: number[] = []; // List to store LoanIds of loans that cannot be deleted
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    Swal.fire({
      title: 'Loading loans...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.loanService.getAllLoans().subscribe(
      (loans) => {
        this.loans = loans;
        this.filteredLoans = loans;
        this.updatePagination();
        Swal.close();
      },
      (error) => {
        Swal.close(); // Close spinner in case of error
        Swal.fire('Error', 'No Loans to load.', 'error');
      }
    );
  }

  searchLoans(): void {
    if (this.searchTerm) {
      this.filteredLoans = this.loans.filter((c) =>
        c.LoanType.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredLoans = [...this.loans];
    }
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLoans = this.filteredLoans.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredLoans.length) {
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

  editLoan(loanId: number): void {
    this.router.navigate([`/admineditloan/${loanId}`]);
  }

  confirmDelete(loanId: number): void {
    this.loanToDelete = loanId;
    this.showDeleteModal = true;
  }

  deleteLoan(): void {
    if (this.loanToDelete !== null) {
      this.loanService.deleteLoan(this.loanToDelete).subscribe({
        next: () => {
          this.loadLoans();
          this.closeDeleteModal();
        },
        error: (error) => {
          // Add the LoanId to nonDeletableLoanIds after error occurs
          this.errorMessage =
            error.error.Message ||
            'This loan cannot be deleted as a user has already applied for it.';
          if (!this.nonDeletableLoanIds.includes(this.loanToDelete!)) {
            this.nonDeletableLoanIds.push(this.loanToDelete!);
          }
          this.showDeleteModal = false;
          this.showErrorModal = true;
        }
      });
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.loanToDelete = null;
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
  }

  isDeleteDisabled(loanId: number): boolean {
    // Check if the loan is in the nonDeletableLoanIds list
    return this.nonDeletableLoanIds.includes(loanId);
  }
}