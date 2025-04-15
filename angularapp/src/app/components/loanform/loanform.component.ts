import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {
  
    loanForm: FormGroup;
    submitted = false;
    proofFile: File | null = null;
    showSuccessPopup = false;
   
    constructor(private fb: FormBuilder, private router: Router) {
      this.loanForm = this.fb.group({
        farmLocation: ['', Validators.required],
        farmerAddress: ['', Validators.required],
        farmSize: ['', Validators.required],
        farmPurpose: ['', Validators.required],
      });
    }
    ngOnInit(): void {
    }
   
    onFileChange(event: any): void {
      if (event.target.files && event.target.files.length > 0) {
        this.proofFile = event.target.files[0];
      } else {
        this.proofFile = null;
      }
    }
   
    onSubmit(): void {
      this.submitted = true;
   
      if (this.loanForm.valid && this.proofFile) {
        // Simulate API call
        this.showSuccessPopup = true;
      }
    }
   
    redirectToUserView(): void {
      // Navigate to userviewloan component
      this.router.navigate(['/userviewloan']);
    }
   
    goBack(): void {
      this.router.navigate(['/userviewloan']);
    }
  }
   
