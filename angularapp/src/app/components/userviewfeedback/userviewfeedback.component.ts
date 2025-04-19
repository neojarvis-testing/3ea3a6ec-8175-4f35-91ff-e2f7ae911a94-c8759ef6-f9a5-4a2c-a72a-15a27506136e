import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  columnDefs = [
    { headerName: 'S.No', valueGetter: 'node.rowIndex + 1', sortable: true,filter: true },
    { headerName: 'User ID', field: 'UserId', sortable: true,filter: true },
    { headerName: 'Feedback', field: 'FeedbackText', sortable: true,filter: true },
    { headerName: 'Date', field: 'Date', cellRenderer: (data: any) => new Date(data.value).toLocaleDateString(), sortable: true,filter: true },
    {
      headerName: 'Actions',
      cellRendererFramework: DeleteButtonRendererComponent // Custom renderer for the delete button
    }
  ];
  context = { componentParent: this }; // Passing parent component context to AG Grid
  selectedFeedback: Feedback | null = null;
  showDeleteModal: boolean = false;
  showLogoutModal: boolean = false; // State for logout modal
  errorMessage: string = '';

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (userId) {
      Swal.fire({
        title: 'Loading feedbacks...',
        text: 'Please wait',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.feedbackService.getAllFeedbacksByUserId(userId).subscribe(
        (data) => {
          this.feedbacks = data;
          Swal.close();
          if (this.feedbacks.length === 0) {
            this.errorMessage = 'No data found';
          }
        },
        (error) => {
          Swal.close();
          console.error('Error fetching feedbacks:', error);
          this.errorMessage = 'No Feedbacks Found.';
          Swal.fire('Error', 'No feedbacks to load.', 'error');
        }
      );
    }
  }

  confirmDelete(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.showDeleteModal = true;
  }

  deleteFeedback(): void {
    if (this.selectedFeedback) {
      this.feedbackService.deleteFeedback(this.selectedFeedback.FeedbackId!).subscribe(
        () => {
          this.showDeleteModal = false;
          this.loadFeedbacks();
          Swal.fire({
            title: 'Feedback Deleted',
            text: 'The feedback has been successfully deleted!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Error deleting feedback:', error);
          this.errorMessage = 'Failed to delete feedback.';
        }
      );
    }
  }

  // Logout Modal Logic
  logout(): void {
    this.showLogoutModal = true;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    localStorage.clear(); // Clear user data from localStorage
    this.router.navigate(['/login']); // Navigate to the login page
  }

  cancelLogout(): void {
    this.showLogoutModal = false; // Close the logout modal without action
  }
}