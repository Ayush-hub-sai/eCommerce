import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  cartProducts: any[] = [];
  subTotal: number = 0;
  loggedUserData: any

  checkOutObj: any = {
    "SaleId": 0,
    "CustId": 0,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "Patmm ",
    "DeliveryAddress1": "",
    "DeliveryAddress2": "Ner ATM",
    "DeliveryCity": "",
    "DeliveryPinCode": "",
    "DeliveryLandMark": ""
  };

  constructor(private productService: ProductService) {
    const localData = localStorage.getItem('loggedData')
    if (localData != null) {
      const parseObj = JSON.parse(localData)
      this.loggedUserData = parseObj
    }
  }

  ngOnInit(): void {
    this.loadCart(this.loggedUserData.custId);
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

  RemoveItem(id: number) {
    this.productService.removeCartItemById(id).subscribe((res: any) => {
      if (res.result) {
        this.loadCart(this.loggedUserData.custId);
        this.productService.cartAddedSubject.next(true);
      }
    })
  }

  placeOrder() {
    this.checkOutObj.TotalInvoiceAmount = this.subTotal;
    this.productService.cartAddedSubject.next(true);
    this.checkOutObj.CustId = this.loggedUserData.custId
    console.log(this.checkOutObj);

    this.productService.placeOrder(this.checkOutObj).subscribe((res: any) => {
      if (res.result) {
        alert(res.message)
        this.loadCart(this.loggedUserData.custId);
        this.productService.cartAddedSubject.next(true);
      }
    })
  }

}
