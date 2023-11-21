import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  categoryList: any[] = []
  selectedCategory: number = 0;
  cartObj: any = {
    "CartId": 0,
    "CustId": 0,
    "ProductId": 0,
    "Quantity": 0,
    "AddedDate": new Date()
  };
  loggedUserData: any


  constructor(private productService: ProductService) {
    const localData = localStorage.getItem('loggedData')
    if (localData != null) {
      const parseObj = JSON.parse(localData)
      this.loggedUserData = parseObj
    }

  }

  ngOnInit(): void {
    this.loadCategories()
    this.loadAllProducts();
  }

  loadCategories() {
    this.productService.getAllCategories().subscribe((response: any) => {
      this.categoryList = response.data;
    })
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((result: any) => {
      this.productList = result.data;
    })
  }

  getProductByCategoryId(categoryId: number) {
    this.selectedCategory = categoryId
    this.productService.getProductByCategoryId(categoryId).subscribe((result: any) => {
      this.productList = result.data;
    })
  }

  addItemToCart(productId: number) {
    const Obj: any = {
      "CartId": 0,
      "CustId": this.loggedUserData.custId,
      "ProductId": productId,
      "Quantity": 1,
      "AddedDate": new Date()
    };

    this.productService.addToCart(Obj).subscribe((result: any) => {
      if (result.result) {
        alert("Product Added To Cart");
        this.productService.cartAddedSubject.next(true);
      }
    })
  }

}
