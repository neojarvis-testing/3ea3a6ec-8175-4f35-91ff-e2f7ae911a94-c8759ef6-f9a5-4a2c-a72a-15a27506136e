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
  constructor(private lService: LoanService, private route: Router, private Aroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.Aroute.params.subscribe(p => {
      this.editId = p.id;
      this.lService.getLoanById(this.editId).subscribe(res => { this.editLoan = res; });
    });
  }
  updateLoan(): void {
    if (this.editLoan.LoanType && this.editLoan.Description && this.editLoan.InterestRate && this.editLoan.MaximumAmount && this.editLoan.RepaymentTenure && this.editLoan.Eligibility && this.editLoan.DocumentsRequired) {
      this.lService.updateLoan(this.editId, this.editLoan).subscribe(() => {
        this.route.navigate(['/viewloan']);
      }, (error) => {
        if (error.status === 500) {
          this.errorMessage = "Loan with the same name already exists";
          this.showModal = true;
        }
      });
    }
  }
  cancelUpdate() {
    this.route.navigate(['viewloan']);
  }
  closeModal() {
    this.showModal = false;
  }
}

