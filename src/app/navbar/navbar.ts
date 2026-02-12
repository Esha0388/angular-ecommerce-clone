import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Cartservice } from '../cartservice';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {

  constructor(
    public service2: Cartservice,
    public authService: AuthService
  ) {}

  isCartOpen = false;

  toggleCartPopup() {
    this.isCartOpen = !this.isCartOpen;
  }
}
