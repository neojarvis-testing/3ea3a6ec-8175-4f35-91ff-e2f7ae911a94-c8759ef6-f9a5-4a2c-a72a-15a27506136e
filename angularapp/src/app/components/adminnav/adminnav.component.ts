import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  isAdmin: boolean = true; // Set to true if the user is an admin
  Username: string = ''; // Placeholder for the actual username
  role: string = this.isAdmin ? 'Admin' : 'User';
  userId: number; // Ensure you have userId
  showLogoutModal: boolean = false; // Add this line
  constructor(private authService: AuthService, private router: Router, private feedbackService: FeedbackService) {}
  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!, 10); // Assuming userId is stored in localStorage
    this.Username = localStorage.getItem('userName');
  }

  logout(): void {
    this.showLogoutModal = true; // Show the modal
  }
  confirmLogout(): void {
    this.showLogoutModal = false; // Hide the modal
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  cancelLogout(): void {
    this.showLogoutModal = false; // Hide the modal
  }
  toggleDropdown(event: Event): void {
    event.preventDefault();
    const dropdown = (event.currentTarget as HTMLElement).closest('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }
}

