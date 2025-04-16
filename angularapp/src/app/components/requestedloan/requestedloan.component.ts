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

// import { Component, OnInit } from '@angular/core';
// import { LoanApplication } from 'src/app/models/loanapplication.model';
// import { LoanService } from 'src/app/services/loan.service';
// @Component({
//   selector: 'app-requestedloan',
//   templateUrl: './requestedloan.component.html',
//   styleUrls: ['./requestedloan.component.css']
// })
// export class RequestedloanComponent implements OnInit {
//   requests: CookingClassRequest[] = [];
//   filteredRequests: CookingClassRequest[] = [];
//   paginatedRequests: CookingClassRequest[] = [];
//   selectedRequest: CookingClassRequest | null = null;
//   statusFilter: string | 'all' = 'all';
//   searchText: string = '';
//   searchTerm: string = '';
//   currentPage: number = 1;
//   itemsPerPage: number = 10;
//   constructor(private cookingClassService: CookingClassService) { }
//   ngOnInit(): void {
//     this.fetchRequests();
//   }
//   fetchRequests(): void {
//     this.cookingClassService.getAllCookingClassRequests().subscribe({
//       next: (data: CookingClassRequest[]) => {
//         this.requests = data.map(req => {
//           if (!req.CookingClassRequestId) {
//             console.error("Missing request ID for:", req);
//           }
//           if (req.Status === undefined || req.Status === null) {
//             req.Status = 'Pending'; // Default to Pending
//           }
//           return req;
//         });
//         this.filteredRequests = this.requests;
//         this.filterData(); // Apply filters after fetching data
//         this.updatePagination();
//       },
//       error: (error) => {
//         console.error('Error fetching requests:', error);
//       }
//     });
//   }
//   searchCookingClasses(): void {
//     if (this.searchTerm) {
//       this.filteredRequests = this.requests.filter(c => {
//         const ClassNameMatch = c.CookingClass.ClassName.toLowerCase().includes(this.searchTerm.toLowerCase());
//         return ClassNameMatch;
//       });
//     } else {
//       this.filteredRequests = this.requests;
//       console.log('Reset filtered classes', this.filteredRequests);
//     }
//     this.updatePagination();
//   }
//   filterData(): void {
//     this.filteredRequests = this.requests.filter(req => {
//       console.log(req);
//       const status = req.Status ? req.Status.toLowerCase() : '';
//       const dietaryPreferences = req.DietaryPreferences ? req.DietaryPreferences.toLowerCase() : '';
//       const cookingGoals = req.CookingGoals ? req.CookingGoals.toLowerCase() : '';
//       const matchesStatus = this.statusFilter === 'all' || status === this.statusFilter.toLowerCase();
//       const matchesSearch = dietaryPreferences.includes(this.searchText.toLowerCase()) || cookingGoals.includes(this.searchText.toLowerCase());
//       return matchesStatus && matchesSearch;
//     });
//     this.updatePagination();
//   }
//   updatePagination(): void {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     this.paginatedRequests = this.filteredRequests.slice(startIndex, endIndex);
//   }
//   nextPage(): void {
//     if ((this.currentPage * this.itemsPerPage) < this.filteredRequests.length) {
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
//     return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
//   }
//   approveRequest(index: number, request: CookingClassRequest): void {
//     if (request.Status === 'Rejected') {
//       console.error("Cannot approve a rejected request.");
//       return;
//     }
//     if (!request.CookingClassRequestId) {
//       console.error("Invalid request ID. Request:", request);
//       return;
//     }
//     const updatedRequest = { ...request, Status: 'Approved' };
//     this.cookingClassService.updateCookingClassRequest(request.CookingClassRequestId, updatedRequest).subscribe({
//       next: () => {
//         this.requests[index] = updatedRequest;
//         const filteredIndex = this.filteredRequests.findIndex(req => req.CookingClassRequestId === request.CookingClassRequestId);
//         if (filteredIndex !== -1) {
//           this.filteredRequests[filteredIndex] = updatedRequest;
//         }
//         this.filterData();
//       },
//       error: (error) => {
//         console.error("Error approving request:", error);
//       }
//     });
//   }
//   rejectRequest(index: number, request: CookingClassRequest): void {
//     if (request.Status === 'Approved') {
//       console.error("Cannot reject an approved request.");
//       return;
//     }
//     if (!request.CookingClassRequestId) {
//       console.error("Invalid request ID.");
//       return;
//     }
//     const updatedRequest = { ...request, Status: 'Rejected' };
//     this.cookingClassService.updateCookingClassRequest(request.CookingClassRequestId, updatedRequest).subscribe({
//       next: () => {
//         this.requests[index] = updatedRequest;
//         const filteredIndex = this.filteredRequests.findIndex(req => req.CookingClassRequestId === request.CookingClassRequestId);
//         if (filteredIndex !== -1) {
//           this.filteredRequests[filteredIndex] = updatedRequest;
//         }
//         this.filterData();
//       },
//       error: (error) => {
//         console.error("Error rejecting request:", error);
//       }
//     });
//   }
//   showMore(request: CookingClassRequest): void {
//     this.selectedRequest = request;
//   }
//   closeModal(): void {
//     this.selectedRequest = null;
//   }
//   onStatusChange(newStatus: string): void {
//     this.statusFilter = newStatus;
//     this.filterData();
//   }
//   onSearchChange(searchText: string): void {
//     this.searchText = searchText;
//     this.filterData();
//   }
// }


 