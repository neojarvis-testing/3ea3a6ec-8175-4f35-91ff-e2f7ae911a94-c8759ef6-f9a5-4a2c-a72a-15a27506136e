import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbackList = [
    { id: 1, text: 'Demo Feedback' }
  ];
  showDeleteConfirm = false;
  selectedFeedbackId: number | null = null;
  showLogoutConfirm = false;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  confirmDelete(id: number) {
    this.selectedFeedbackId = id;
    this.showDeleteConfirm = true;
  }
  deleteFeedback() {
this.feedbackList = this.feedbackList.filter(fb => fb.id !== this.selectedFeedbackId);
    this.showDeleteConfirm = false;
    this.selectedFeedbackId = null;
  }
  cancelDelete() {
    this.showDeleteConfirm = false;
    this.selectedFeedbackId = null;
  }
  confirmLogout() {
    this.showLogoutConfirm = true;
  }
  logout() {
    this.showLogoutConfirm = false;
    this.router.navigate(['/login']);
  }
  cancelLogout() {
    this.showLogoutConfirm = false;
  }
}
