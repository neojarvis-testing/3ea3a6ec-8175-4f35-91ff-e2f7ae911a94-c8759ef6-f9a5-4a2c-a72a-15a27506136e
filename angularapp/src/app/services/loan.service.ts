import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl ='https://8080-beebacfeedbecdbedbbccdbfcaceffaacaaae.premiumproject.examly.io/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/Loan`, { headers: this.getAuthHeaders()});
  }

  deleteLoan(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Loan/${loanId}`, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' });
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/Loan/${id}`, { headers: this.getAuthHeaders()});
  }

  addLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/Loan`,  loan, { headers: this.getAuthHeaders(), responseType: 'text' as 'json'});
  }

  updateLoan(id: number, requestObject: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/Loan/${id}`, requestObject, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' });
  }

  getAppliedLoans(userId: number): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/LoanApplication/GetLoanApplicationsByUserId/${userId}`, { headers: this.getAuthHeaders()});
  }

  deleteLoanApplication(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/LoanApplication/DeleteLoanApplication/${loanId}`, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' });
  }

  addLoanApplication(data: LoanApplication): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.apiUrl}/LoanApplication/AddLoanApplication`, data, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' });
  }

  getAllLoanApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/LoanApplication/GetAllLoanApplications`, { headers: this.getAuthHeaders()});
  }

  updateLoanStatus(id: number, loanApplication: LoanApplication): Observable<LoanApplication> {
    return this.http.put<LoanApplication>(`${this.apiUrl}/LoanApplication/UpdateLoanApplication/${id}`, loanApplication, { headers: this.getAuthHeaders(), responseType: 'text' as 'json' });
  }
}
