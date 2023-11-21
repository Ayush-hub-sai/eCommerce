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
    "CustId": 1,
    "ProductId": 0,
    "Quantity": 0,
    "AddedDate": "2023-04-27T07:12:40.926Z"
  };
  constructor(private productService: ProductService) {

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
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe((result: any) => {
      if (result.result) {
        alert("Product Added To Cart");
        this.productService.cartAddedSubject.next(true);
      }
    })
  }

}
