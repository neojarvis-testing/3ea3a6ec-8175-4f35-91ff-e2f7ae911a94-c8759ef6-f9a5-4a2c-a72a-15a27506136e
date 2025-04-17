// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Loan } from 'src/app/models/loan.model';
// import { LoanService } from 'src/app/services/loan.service';
// import { AuthService } from 'src/app/services/auth.service';
// @Component({
//   selector: 'app-createloan',
//   templateUrl: './createloan.component.html',
//   styleUrls: ['./createloan.component.css']
// })
// export class CreateloanComponent implements OnInit {
//     newLoan: Loan = {
//       LoanType: '',
//       Description: '',
//       InterestRate: 0,
//       MaximumAmount: 0,
//       RepaymentTenure: 0,
//       Eligibility: '',
//       DocumentsRequired: ''
//     };
//     formSubmitted: boolean = false;
//     message: string = '';
//     isLoggedIn: boolean = false;
//     showModal: boolean = false;
//     showModalOnce: boolean = false;
//   constructor(private loanService: LoanService) { }

//   ngOnInit(): void {
//     this.checkLoginStatus();
//   }
//   checkLoginStatus(): void {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.isLoggedIn = true;
//     } else {
//       this.isLoggedIn = false;
//       this.showErrorMessage('Please log in to create a loan');
//       // this.router.navigate(['/login']);
//     }
//   }
 
//   addLoan(form: NgForm) {
//     if (!this.isLoggedIn) {
//       this.showErrorMessage('Please log in first');
//       return;
//     }
//     if (form.invalid || !this.customValidation()) {
//       return;
//     }
//     this.loanService.addLoan(this.newLoan).subscribe({
//       next: () => {
//         // this.router.navigate(['/viewloan']);
//         this.showSuccessMessage('Loan created successfully');
//         this.showModal = true; // Show the modal on success
//       },
//       error: (error) => {
//         console.error('Error creating loan:', error);
//         if (error.error && error.error.Message && error.error.Message.includes('Loan with the same type already exists')) {
//           this.showErrorMessage('A loan with this type already exists. Please choose a different type.');
//         } else {
//           this.showErrorMessage('Error creating loan');
//         }
//         this.showModal = true; // Show the modal on error
//       }
//     });
//   }
 
//   customValidation(): boolean {
//     const { LoanType, Description, InterestRate, MaximumAmount, RepaymentTenure, Eligibility, DocumentsRequired } = this.newLoan;
//     if (LoanType.length > 50) {
//       this.showErrorMessage('Loan Type must be less than 50 characters');
//       return false;
//     }
//     if (Description.length > 200) {
//       this.showErrorMessage('Description must be less than 200 characters');
//       return false;
//     }
//     if (InterestRate <= 0) {
//       this.showErrorMessage('Interest Rate must be greater than 0');
//       return false;
//     }
//     if (MaximumAmount <= 0) {
//       this.showErrorMessage('Maximum Amount must be greater than 0');
//       return false;
//     }
//     if (RepaymentTenure <= 0) {
//       this.showErrorMessage('Repayment Tenure must be greater than 0');
//       return false;
//     }
//     if (Eligibility.length > 200) {
//       this.showErrorMessage('Eligibility must be less than 200 characters');
//       return false;
//     }
//     if (DocumentsRequired.length > 200) {
//       this.showErrorMessage('Documents Required must be less than 200 characters');
//       return false;
//     }
//     return true;
//   }
 
//   validateField(form: NgForm, fieldName: string) {
//     const control = form.controls[fieldName];
//     if (control && control.errors) {
//       control.markAsDirty();
//     }
//   }
 
//   closeModal() {
//     this.showModal = false;  // Close the modal
//     this.showModalOnce = false; // Reset the flag
//   }
 
//   showErrorMessage(message: string): void {
//     this.message = message;
//     alert(`Error: ${message}`);
//   }
 
//   showSuccessMessage(message: string): void {
//     this.message = message;
//     alert(`Success: ${message}`);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateloanComponent implements OnInit {
  newLoan: Loan = {
    LoanType: '',
    Description: '',
    InterestRate: 0,
    MaximumAmount: 0,
    RepaymentTenure: 0,
    Eligibility: '',
    DocumentsRequired: ''
  };
  formSubmitted: boolean = false;
  message: string = '';
  isLoggedIn: boolean = false;
  showModal: boolean = false;
  showModalOnce: boolean = false;
  constructor(
    private lService: LoanService,
    private route: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.checkLoginStatus();
  }
  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this.showErrorMessage('Please log in to add a loan');
      // this.route.navigate(['/login']);
    }
  }
  addloan(form: NgForm) {
    if (!this.isLoggedIn) {
      this.showErrorMessage('Please log in first');
      return;
    }
    if (form.invalid || !this.customValidation()) {
      return;
    }
    this.lService.addLoan(this.newLoan).subscribe({
      next: () => {
        this.route.navigate(['/viewloan']);
        this.showSuccessMessage('Loan added successfully');
        this.showModal = true; // Show the modal on success
      },
      error: (error) => {
        console.error('Error adding loan:', error);
        if (error.error && error.error.Message && error.error.Message.includes('Loan with the same name already exists')) {
          this.showErrorMessage('A Loan with this name already exists. Please choose a different name.');
        } else {
          this.showErrorMessage('Error adding loan');
        }
        this.showModal = true; // Show the modal on error
      }
    });
  }
  customValidation(): boolean {
    const { LoanType, Description, InterestRate, MaximumAmount, RepaymentTenure, Eligibility, DocumentsRequired } = this.newLoan;
    if (LoanType.length > 50) {
      this.showErrorMessage('Loan Type must be less than 50 characters');
      return false;
    }
    if (Description.length > 200) {
      this.showErrorMessage('Description must be less than 200 characters');
      return false;
    }
    if (InterestRate <= 0) {
      this.showErrorMessage('Interest Rate must be greater than 0');
      return false;
    }
    if (MaximumAmount <= 0) {
       this.showErrorMessage('Maximum Amount must be greater than 0');
      return false;
    }
    if (RepaymentTenure <= 0) {
      this.showErrorMessage('Repayment Tenure must be greater than 0');
      return false;
    }
    if (Eligibility.length > 200) {
      this.showErrorMessage('Eligibility must be less than 200 characters');
      return false;
    }
    if (DocumentsRequired.length > 200) {
      this.showErrorMessage('Documents Required must be less than 200 characters');
      return false;
    }
    return true;
  }
  validateField(form: NgForm, fieldName: string) {
    const control = form.controls[fieldName];
    if (control && control.errors) {
      control.markAsDirty();
    }
  }
  closeModal() {
    this.showModal = false;  // Close the modal
    this.showModalOnce = false; // Reset the flag
  }
  showErrorMessage(message: string): void {
    this.message = message;
    Swal.fire({
      title: 'Error!',
      text: message,
      confirmButtonText: 'OK'
    });
  }
  showSuccessMessage(message: string): void {
    this.message = message;
    Swal.fire({
      title: 'Success!',
      text: message,
      confirmButtonText: 'OK'
    });
  }
}