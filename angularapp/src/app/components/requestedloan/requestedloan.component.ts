import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {

  loanApplications:LoanApplication[]=[]
  selectedLoanApplication: LoanApplication | null = null;

  constructor(private loanService:LoanService, private router:Router) { }

  ngOnInit(): void {
    this.getAllApplicationLoans();
  }

  public getAllApplicationLoans(){
    Swal.fire({
      title: 'Loading loan applications...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
      this.loanService.getAllLoanApplications().subscribe(data=>{
      this.loanApplications=data;
      Swal.close();
    },
    (error) => {
      Swal.close(); // Close spinner in case of error
      Swal.fire('Error', 'No requested loans to load.', 'error');
    });
  }

  public changeStatusToApproved(id:number, la:LoanApplication){
    la.LoanStatus=1;
    return this.loanService.updateLoanStatus(id, la).subscribe(data=>{
      this.getAllApplicationLoans();
    });
  }

  public changeStatusToRejected(id:number, la:LoanApplication){
    la.LoanStatus=2;
    return this.loanService.updateLoanStatus(id, la).subscribe(data=>{
      this.getAllApplicationLoans();
    });
  }
  public showDetails(la: LoanApplication) {
    this.selectedLoanApplication = la;
  }

  public closeModal() {
    this.selectedLoanApplication = null;
  }

}




 