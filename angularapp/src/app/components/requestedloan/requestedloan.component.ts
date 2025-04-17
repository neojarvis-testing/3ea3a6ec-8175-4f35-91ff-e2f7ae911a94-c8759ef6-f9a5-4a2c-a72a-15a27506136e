import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {

  loanApplications:LoanApplication[]=[]

  constructor(private loanService:LoanService, private router:Router) { }

  ngOnInit(): void {
    this.getAllApplicationLoans();
  }

  public getAllApplicationLoans(){
    return this.loanService.getAllLoanApplications().subscribe(data=>{
      this.loanApplications=data;
    }, error=>{
      this.router.navigate(['/error'])
    })
  }

  public changeStatusToApproved(id:number, la:LoanApplication){
    la.LoanStatus=1;
    return this.loanService.updateLoanStatus(id, la).subscribe(data=>{
      this.getAllApplicationLoans();
    }, error=>{
      this.router.navigate(['/error'])
    })
  }

  public changeStatusToRejected(id:number, la:LoanApplication){
    la.LoanStatus=2;
    return this.loanService.updateLoanStatus(id, la).subscribe(data=>{
      this.getAllApplicationLoans();
    }, error=>{
      this.router.navigate(['/error'])
    })
  }
}




 