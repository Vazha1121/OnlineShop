import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FullProduct } from '../../full-product';
import { Product } from '../../product';

@Component({
  selector: 'app-laptops',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './laptops.component.html',
  styleUrl: './laptops.component.scss',
})
export class LaptopsComponent implements OnInit {
  constructor(public api: ApiService, public cookie: CookieService) {}
  ngOnInit(): void {
    this.brandsApi();
    this.getProds(this.pageID);
    this.getInfo();
    this.showAllCardInterface();
  }

  public minPrice: number = 0;
  public maxPrice: number = 2000;
  public priceGap: number = 100;
  public productList!: Product[];
  public interFaceData: any;
  showAllCardInterface() {
    this.api.interfaceProd().subscribe({
      next: (data: FullProduct) => {
        console.log(data);
        this.interFaceData = data.products;
      },
    });
  }
  get progressLeft(): string {
    return `${(this.minPrice / 2000) * 100}%`;
  }
  get progressRight(): string {
    return `${100 - (this.maxPrice / 2000) * 100}%`;
  }

  onInputChange() {
    if (this.maxPrice - this.minPrice < this.priceGap) {
      this.minPrice = Math.min(this.minPrice, this.maxPrice - this.priceGap);
      this.maxPrice = Math.max(this.maxPrice, this.minPrice + this.priceGap);
    }
  }
  onRangeChange() {
    this.api
      .filterWithPrice(this.minPrice, this.maxPrice, this.pageID)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          console.log(this.minPrice);
          console.log(this.maxPrice);

          if (this.minPrice > 0) {
            this.prods = data.products;
          }
        },
      });
    if (this.maxPrice - this.minPrice < this.priceGap) {
      this.maxPrice = this.minPrice + this.priceGap;
      this.minPrice = this.maxPrice - this.priceGap;
    }
  }
  GetFilteredPage(id: any) {
    id++;
    this.pageID = id;
    this.api
      .filterWithPrice(this.minPrice, this.maxPrice, this.pageID)
      .subscribe({
        next: (data: any) => {
          if (this.minPrice > 0) {
            this.prods = data.products;
          }
        },
      });
  }
  public filterPrice: any;
  /* goOnDetailPage */
  seeDetails(id: any) {
    this.api.getProdId(id).subscribe({
      next: (data: any) => {
        this.api.bSubject.next(data);
      },
    });
  }
  public id: any = 1;
  public pageSize: any = 12;
  public prods: any;
  public pageRaod: any = [1, 2, 3];
  public pageID: any = 0;
  getProds(ID: any) {
    ID++;
    this.pageID = ID;
    this.api.getCategoryWithId(this.id, this.pageID, this.pageSize).subscribe({
      next: (data: FullProduct) => {
        this.prods = data.products;
      },
    });
  }
  getInfo() {
    this.api.gadamzidi.subscribe((data: any) => {
      console.log(data);
      this.prods = data.products;
    });
  }
  /* brands */
  public brandUl: any;
  public brandO: any;
  brandsApi() {
    this.api.brands().subscribe({
      next: (data: any) => {
        this.brandUl = data;
        this.brandO = [
          {
            brand: this.brandUl[0],
          },
          {
            brand: this.brandUl[1],
          },
          {
            brand: this.brandUl[3],
          },
          {
            brand: this.brandUl[6],
          },
          {
            brand: this.brandUl[7],
          },
          {
            brand: this.brandUl[8],
          },
          {
            brand: this.brandUl[9],
          },
          {
            brand: this.brandUl[10],
          },
          {
            brand: this.brandUl[11],
          },
        ];
      },
      error: (err: any) => console.log(err),
    });
  }
  public onlyThissBrand: any;
  showThisBrand(id: any) {
    this.api.getOnlyBrand(this.brandO[id].brand).subscribe({
      next: (data: any) => {
        this.prods = data.products;
        this.openBurgerFilter = false;
      },
    });
  }
  /* addItemInCart */
  public openCart!: boolean;
  public kalata!: boolean;
  public kalataRaiod: any;
  createCart(id: any) {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.api
      .createCart(
        {
          id: id,
          quantity: 1,
        },
        headers
      )
      .subscribe({
        next: (data: any) => {
          this.kalata = true;
          this.kalataRaiod = data.total.quantity;
          this.api.bSubject3.next((this.openCart = true));
          this.api.bSubject2.next(data);
        },
        error: (err: any) => {
          alert('კალათა უკვე შექმნილია');
        },
      });
  }
  addCart(id: any) {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.api
      .addCart(
        {
          id: id,
          quantity: 1,
        },
        headers
      )
      .subscribe({
        next: (data: any) => {
          this.kalataRaiod = data.total.quantity;
          this.api.bSubject3.next((this.openCart = true));
          this.api.bSubject2.next(data);
        },
        error: (err: any) => {
          alert('კალათა უკვე შექმნილია');
        },
      });
  }
  public cartData!: boolean;
  getCart() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.api.getCart(headers).subscribe({
      next: (data: any) => {
        this.cartData = true;
      },
      error: (err: any) => {
        console.log('შექმენით კალათა');
        this.cartData = false;
      },
    });
  }
  public openBurgerFilter!: boolean;

  openFilter() {
    this.openBurgerFilter = !this.openBurgerFilter;
  }
}
