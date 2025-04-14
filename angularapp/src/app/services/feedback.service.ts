import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public apiUrl = '';
  
  constructor(private http: HttpClient) { }

  sendFeedback(feedback: Feedback): Observable<Feedback> {
    const headers = this.getAuthHeaders();
    return this.http.post<Feedback>(this.apiUrl, feedback, { headers });
  }


  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<Feedback[]>(url, { headers });
  }


  deleteFeedback(feedbackId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${feedbackId}`;
    return this.http.delete<void>(url, { headers });
  }


  getFeedbacks(): Observable<Feedback[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Feedback[]>(this.apiUrl, { headers });
  }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}