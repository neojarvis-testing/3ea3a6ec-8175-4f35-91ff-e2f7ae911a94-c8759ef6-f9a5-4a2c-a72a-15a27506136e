import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';

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
  showLogoutModal: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
     // Ensure `localStorage` values are handled gracefully
     const storedUserId = localStorage.getItem('userId');
     this.userId = storedUserId ? parseInt(storedUserId, 10) : 0;
     this.Username = localStorage.getItem('userName') || 'Guest'; 
  }
  logout(): void {
    this.showLogoutModal = true; // Show the modal
  }

  confirmLogout(): void {
    this.showLogoutModal = false; // Hide the modal
    this.authService.logout();
    // this.router.navigate(['/login']);
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
