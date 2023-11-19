import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  { path: 'product', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'sale', component: SalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
