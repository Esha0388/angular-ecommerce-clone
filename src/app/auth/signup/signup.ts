import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class SignupComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
  this.auth.signup(this.email, this.password)
    .then(() => {
      alert("✅ Signup successful! Please login.");
      this.router.navigate(['/login']);   
    })
    .catch((err: any) => alert(err.message));
}

}
