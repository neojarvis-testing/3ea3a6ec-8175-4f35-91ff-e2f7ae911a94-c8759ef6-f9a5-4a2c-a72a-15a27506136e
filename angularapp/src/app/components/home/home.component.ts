import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    console.log(this.userRole);
    // Preload background image
    this.preloadImage('/assets/images/FarmImg.jpg');
  }
  preloadImage(src: string): void {
    const img = new Image();
    img.src = src;
  }
}