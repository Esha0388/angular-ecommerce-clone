import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cartservice } from '../cartservice';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  selectedOrder: any = null;

  constructor(
    public service2: Cartservice,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.selectedOrder = this.service2.getOrderById(Number(id));
      } else {
        this.selectedOrder = null;
      }
    });
  }

  goBack() {
    this.router.navigate(['/cart']);
  }
}