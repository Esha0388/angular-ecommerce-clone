import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cartservice } from '../cartservice';
import { AuthService } from '../auth/auth';
import { take } from 'rxjs';


@Component({
  selector: 'app-product-componenet',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-componenet.html',
  styleUrl: './product-componenet.css',
})
export class ProductComponenet implements OnInit{

  products:any[]=[];
  filterProducts: any[] = [];
  selectedCategory: string = 'all';

  searchText:string='';
  isCartOpen = false;



  constructor(private service:TemplateService , private route:ActivatedRoute, public service2:Cartservice,private router:Router,private authService: AuthService){
    
  }
  
  ngOnInit() {
    this.service.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.filterProducts = res;
        this.route.queryParams.subscribe(params => {
          this.selectedCategory = params['category'] || 'all';
          this.applyFilter();
        });
      },
      error: (err) => {
        console.log('Api Error', err);
      }
    });
  }


applyFilter() {
  if (this.selectedCategory.toLowerCase() === 'all') {
    this.filterProducts = this.products;
  } else {
    this.filterProducts = this.products.filter(
      product => product.category?.name.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }
}

  addProduct(product: any) {
  this.service2.addToCart(product);
  this.isCartOpen = true; 
}


  getAllImages(product: any): string[] {
  if (!product?.images || product.images.length === 0) {
    return ['https://placehold.co/600x400'];
  }

  if (product.images.length > 1 && !product.images[0].includes('.jpg') && !product.images[0].includes('.png')) {
    const joined = product.images.join('/');
    return [joined];
  }

  return product.images;
}

handleProductClick(product: any) {

  if (this.service2.isInCart(product.id)) {
    this.isCartOpen = true; 
    return;
  }

  this.service2.addToCart(product);
  this.isCartOpen = true;
}


filterBySearch() {
  const search = this.searchText.toLowerCase().trim();

  this.filterProducts = this.products.filter(product =>
    product.title.toLowerCase().includes(search)
  );
}



toggleCartPopup() {
  this.isCartOpen = !this.isCartOpen;
}

checkout() {

  this.authService.currentUser$
    .pipe(take(1))
    .subscribe(user => {

      if (!user) {
        alert("⚠ Please login first to checkout");
        this.router.navigate(['/login']);
        return;
      }

      this.service2.placeOrder();
      this.isCartOpen = false;
      alert("✅ Order placed successfully!");
      this.router.navigate(['/cart']);

    });

}

}
