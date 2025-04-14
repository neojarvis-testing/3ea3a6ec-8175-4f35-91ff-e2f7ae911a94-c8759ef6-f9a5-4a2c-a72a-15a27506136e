import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = '';
  private apiLoanApplicationUrl = '';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  deleteLoan(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${loanId}`, { headers: this.getAuthHeaders() });
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addLoan(requestObject: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, requestObject, { headers: this.getAuthHeaders() });
  }

  updateLoan(id: number, requestObject: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}`, requestObject, { headers: this.getAuthHeaders() });
  }

  getAppliedLoans(userId: number): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.apiLoanApplicationUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  deleteLoanApplication(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiLoanApplicationUrl}/${loanId}`, { headers: this.getAuthHeaders() });
  }

  addLoanApplication(data: LoanApplication): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(this.apiLoanApplicationUrl, data, { headers: this.getAuthHeaders() });
  }

  getAllLoanApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(this.apiLoanApplicationUrl, { headers: this.getAuthHeaders() });
  }

  updateLoanStatus(id: number, loanApplication: LoanApplication): Observable<LoanApplication> {
    return this.http.put<LoanApplication>(`${this.apiLoanApplicationUrl}/${id}`, loanApplication, { headers: this.getAuthHeaders() });
  }
}
