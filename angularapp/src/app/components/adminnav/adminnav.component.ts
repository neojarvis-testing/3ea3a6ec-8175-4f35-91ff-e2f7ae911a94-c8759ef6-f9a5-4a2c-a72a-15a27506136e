import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminNavComponent implements OnInit{
  username: string = 'AdminUser'; // Ideally, fetch from a service
  role: string = 'Admin';
  showLoanSubmenu = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  toggleLoanSubmenu(show: boolean) {
    this.showLoanSubmenu = show;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    // Handle logout logic here
    console.log('Logging out...');
  }
}
