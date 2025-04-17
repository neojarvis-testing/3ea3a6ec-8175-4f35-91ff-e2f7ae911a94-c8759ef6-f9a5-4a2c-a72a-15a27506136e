import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

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

  showDeleteModal:boolean = false;
  localDelteVar : number = 0;
  userId = +(localStorage.getItem('userId'));
  showViewModal : boolean = false;

  

  constructor(private loanApp : LoanService, private router : Router) { }


  ngOnInit(): void {
    this.fetchAlloanApplicationsOfUser();
  }

  fetchAlloanApplicationsOfUser(){
    this.loanApp.getAppliedLoans(this.userId).subscribe(d=>{
      this.loanApplicationList = d;
    },(error)=>{
      this.router.navigate(['/error'])
    })
  }

  openDeleteModal(id:number){
    this.showDeleteModal = true;
    this.localDelteVar = id;

  }

  viewLoan(id:number){
    this.showViewModal = true;
    console.log(id);
    this.loanApplication = this.loanApplicationList.find(l=>
      l.LoanApplicationId == id
      
    )
  }

  closeDeleteModal(){
    this.showDeleteModal = false;
  }

  confirmDelete(){
    this.loanApp.deleteLoanApplication(this.localDelteVar).subscribe(d=>{
      this.fetchAlloanApplicationsOfUser();
      this.showDeleteModal = false;
    },(error)=>{
      this.router.navigate(['/error'])
    })
  }

  closeviewModal(){
    this.showViewModal = false;
  }

  filter(str: string){
    this.loanApp.getAppliedLoans(this.userId).subscribe(d=>{
      this.loanApplicationList = d;
      this.loanApplicationList = this.loanApplicationList.filter(d=>JSON.stringify(d).toLowerCase().includes(str))
    },(error)=>{
      this.router.navigate(['/error'])
    })
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

