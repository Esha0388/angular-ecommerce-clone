import { Routes } from '@angular/router';
import { ProductComponenet } from './product-componenet/product-componenet';
import { Cart } from './cart/cart';
import { Myaccount } from './myaccount/myaccount';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductComponenet,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'account',
    component: Myaccount,
  },
  { path: 'cart/:id', 
    component: Cart 
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignupComponent
    }

];
