import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks = [
    { userName: 'Director', feedback: 'Demo Feedback', postedDate: '29/12/2018', email: 'director@gmail.com', mobileNumber: '+1234567890' }
    // Add more feedback objects here
  ];
  filteredFeedbacks = this.feedbacks;
  selectedFeedback: any = null;
  searchTerm: string = '';
 
  constructor() { }
 
  ngOnInit(): void {
  }
 
  showProfile(feedback: any) {
    this.selectedFeedback = feedback;
  }
 
  closeModal() {
    this.selectedFeedback = null;
  }
 
  filterFeedbacks() {
    this.filteredFeedbacks = this.feedbacks.filter(feedback => 
      feedback.feedback.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      feedback.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}