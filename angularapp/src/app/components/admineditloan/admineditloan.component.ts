import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-admineditloan',
  templateUrl: './admineditloan.component.html',
  styleUrls: ['./admineditloan.component.css']
})
export class AdmineditloanComponent implements OnInit {
  editLoan: Loan = {
    LoanType: '',
    Description: '',
    InterestRate: 0,
    MaximumAmount: 0,
    RepaymentTenure: 0,
    Eligibility: '',
    DocumentsRequired: ''
  };
  formSubmitted: boolean = false;
  editId: number;
  errorMessage: string = '';
  showModal: boolean = false;

  constructor(private loanService: LoanService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.editId = params.id; 
      this.loanService.getLoanById(this.editId).subscribe(res => {
        this.editLoan = res; 
      });
    });
  }

  updateLoan(): void {
    
    if (this.editLoan.LoanType && this.editLoan.Description && this.editLoan.InterestRate && this.editLoan.MaximumAmount && this.editLoan.RepaymentTenure && this.editLoan.Eligibility && this.editLoan.DocumentsRequired) {
      this.loanService.updateLoan(this.editId, this.editLoan).subscribe(() => {
        this.router.navigate(['/adminviewloan']); 
      }, (error) => {
        if (error.status === 500) {
          this.errorMessage = "Loan with the same type already exists"; 
          this.showModal = true; 
        }
      });
    }
  }

  cancelUpdate(): void {
    this.router.navigate(['/adminviewloan']); 
  }

  closeModal(): void {
    this.showModal = false; 
  }
}