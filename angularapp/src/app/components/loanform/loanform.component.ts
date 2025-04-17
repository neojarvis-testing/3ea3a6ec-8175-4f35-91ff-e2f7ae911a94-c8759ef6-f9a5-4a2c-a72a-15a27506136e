import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service'; 
import { AuthService } from 'src/app/services/auth.service';
import { LoanApplication } from 'src/app/models/loanapplication.model';
@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {
  loana:LoanApplication={
    SubmissionDate: '',
    LoanStatus: 0,
    FarmLocation: '',
    FarmerAddress: '',
    FarmSizeInAcres: 0,
    FarmPurpose: '',
    File: ''
  };
  showPopup: boolean = false;
  constructor(
    private loanService: LoanService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken(this.authService.getToken()!);
    if (userId) {
      this.loana.UserId = parseInt(userId, 10);
    }
  }
  onSubmit(loanaForm: any): void {
    if (!this.loana.FarmLocation || !this.loana.FarmPurpose) {
      loanaForm.form.markAllAsTouched(); // Mark all fields as touched to show validation messages
      return;
    }
    this.loana.SubmissionDate = new Date().toISOString();
    
    console.log('Submitting loan:', this.loana);
    this.loana.LoanId = Number(localStorage.getItem("LoanId"));
    this.loanService.addLoanApplication(this.loana).subscribe(
      () => {
        console.log('Loan submitted successfully');
        localStorage.removeItem('LoanId');
        this.showPopup = true;
        setTimeout(() => {
          this.router.navigate(['/userviewloan']); // Adjust the route as needed
        }, 2000); // Delay to show the popup before navigating
      },
      (error) => {
        console.error('Error submitting loan:', error);
      }
    );
  }
  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['/userviewloan']); // Adjust the route as needed
  }
  goBack(): void {
    this.router.navigate(['/userviewloan']); // Adjust the route as needed
  }
}


   
