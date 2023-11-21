import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  cartProducts: any[] = [];
  subTotal: number = 0;
  userRegObj = {
    "Name": "",
    "MobileNo": "",
    "Password": ""
  }

  userLogObj = {
    "UserName": "",
    "UserPassword": ""
  }

  loggedUserData: any

  constructor(private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) {
    const localData = localStorage.getItem('loggedData')
    if (localData != null) {
      const parseObj = JSON.parse(localData)
      this.loggedUserData = parseObj
      this.loadCart(this.loggedUserData.custId);
    }

    this.productService.cartAddedSubject.subscribe(res => {
      if (res) {
        this.loadCart(this.loggedUserData.custId);
      }
    })
  }

  ngOnInit(): void {
    this.loadCart(this.loggedUserData.custId);
  }

  redirectToSale() {
    this.router.navigate(['/sale'])
  }

  loadCart(custId: any) {
    this.subTotal = 0;
    this.productService.getCartItemsByCustId(custId).subscribe((res: any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach(element => {
        this.subTotal = this.subTotal + element.productPrice;
      });
    })
  }

  onRegister() {
    this.userService.register(this.userRegObj).subscribe((res: any) => {
      if (res.result) {
        alert(res.message)
      }
      else {
        alert(res.message)
      }
    })
  }

  onLogin() {
    this.userService.login(this.userLogObj).subscribe((res: any) => {
      if (res.result) {
        this.loggedUserData = res.data
        localStorage.setItem('loggedData', JSON.stringify(res.data))
        alert(res.message)
        this.loadCart(this.loggedUserData.custId)
      }
      else {
        alert(res.message)
      }
    })
  }


}
