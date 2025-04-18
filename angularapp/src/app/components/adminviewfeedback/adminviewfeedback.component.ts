import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  feedbackUsernames: { [key: number]: string } = {};
  selectedFeedback: Feedback | null = null;
  showProfileModal: boolean = false;
  showLogoutModal: boolean = false;
  errorMessage: string = '';
  Username: string = '';
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private feedbackService: FeedbackService, private router: Router) { }
  ngOnInit(): void {
    this.loadFeedbacks();
    this.Username = localStorage.getItem('userName');
  }
  loadFeedbacks(): void {
    Swal.fire({
      title: 'Loading feedbacks...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        console.log('Loading feedbacks...');
        this.feedbacks = data;
        this.loadUsernames(); // Call after feedbacks are loaded
        console.log(this.feedbacks);
        if (this.feedbacks.length === 0) {
          this.errorMessage = 'No data found';
        }
        Swal.close();
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
        this.errorMessage = 'Failed to load feedbacks.';
        Swal.close();
        Swal.fire('Error','No feedback to load','error');  
      }
    );
  }
  loadUsernames(): void {
    console.log('Loading usernames...');
    this.feedbacks.forEach(feedback => {
      this.feedbackService.getUsernameByUserId(feedback.UserId).subscribe(
        username => {
          console.log(`Username for user ID ${feedback.UserId} is: ${username}`); // Log the username here
          this.feedbackUsernames[feedback.UserId] = username;
        },
        error => {
          console.error('Error fetching username:', error);
          this.feedbackUsernames[feedback.UserId] = 'Unknown';
        }
      );
    });
  }
  showProfile(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.showProfileModal = true;
  }
  closeProfileModal(): void {
    this.showProfileModal = false;
    this.selectedFeedback = null;
  }
  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }
  logout(): void {
    this.router.navigate(['/login']);
  }
  // Pagination methods
  get paginatedFeedbacks(): Feedback[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.feedbacks.slice(startIndex, startIndex + this.itemsPerPage);
  }
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.feedbacks.length) {
      this.currentPage++;
    }
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  getTotalPages(): number {
    return Math.ceil(this.feedbacks.length / this.itemsPerPage);
  }
}
