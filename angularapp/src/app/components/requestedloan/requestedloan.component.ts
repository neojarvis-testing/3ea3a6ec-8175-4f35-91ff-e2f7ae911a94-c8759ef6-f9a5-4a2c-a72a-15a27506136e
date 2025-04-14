import { Component, OnInit } from '@angular/core';

interface LoanRequest {
  username: string;
  loanType: string;
  farmLocation: string;
  submissionDate: string;
  farmSize: number;
  status: 'Approved' | 'Rejected' | 'Pending';
  address: string;
  proofUrl: string;
}

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {

  loanRequests: LoanRequest[] = [];
  filteredRequests: LoanRequest[] = [];
  selectedRequest: LoanRequest | null = null;
  selectedStatus: string = 'All';
  searchLoanType: string = '';

  constructor() { }

  ngOnInit(): void {
     // Simulated data
     this.loanRequests = [
      {
        username: 'DemoUser',
        loanType: 'Demo Loan Type',
        farmLocation: 'Demo Location',
        submissionDate: '2024-10-12',
        farmSize: 12,
        status: 'Pending',
        address: 'Demo Address',
        proofUrl: 'assets/demo-proof.png'
      }
    ];
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredRequests = this.loanRequests.filter(req => {
      const matchLoanType = this.searchLoanType
        ? req.loanType.toLowerCase().includes(this.searchLoanType.toLowerCase())
        : true;
      const matchStatus = this.selectedStatus === 'All' || req.status === this.selectedStatus;
      return matchLoanType && matchStatus;
    });
  }

  approveRequest(request: LoanRequest): void {
    request.status = 'Approved';
    this.applyFilters();
  }

  rejectRequest(request: LoanRequest): void {
    request.status = 'Rejected';
    this.applyFilters();
  }

  showMore(request: LoanRequest): void {
    this.selectedRequest = request;
  }

  closeModal(): void {
    this.selectedRequest = null;
  }
}
