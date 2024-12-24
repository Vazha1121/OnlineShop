import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { ApiService } from '../../Services/api.service';
import { RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, CurrencyPipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(public api: ApiService, public cookie: CookieService) {}

  ngOnInit(): void {
    this.showLaptops();
    this.showTelphone();
    this.getCart();
  }

  public slide = [
    {
      src: 'https://gstore.ge/wp-content/uploads/2022/12/16-series-poster-website-ბანნერ-Recovered-01.png.webp',
    },
    {
      src: 'https://gstore.ge/wp-content/uploads/2022/12/SURFACE-BANER-FOR-WEB-01.png.webp',
    },
  ];
  public banks = [
    'https://gstore.ge/wp-content/uploads/2024/09/ბოლო-განვდ-01.png.webp',
  ];
  public laptop = [
    'https://gstore.ge/wp-content/uploads/2024/07/leptopebis-baneri-saitiza-01.png.webp',
  ];
  public telef = [
    'https://gstore.ge/wp-content/uploads/2024/07/telefonebi-saitistvis-baner222-01.png.webp',
  ];

  public laps: any;
  showLaptops() {
    this.api.getCategoryWithId(1, 1, 6).subscribe({
      next: (data: any) => {
        this.laps = data.products;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  public mobiles: any;
  showTelphone() {
    this.api.getWithBrandName('apple', 1, 10).subscribe({
      next: (data: any) => {
        this.mobiles = data.products;
      },
    });
  }
  seeDetails(id: any) {
    this.api.getProdId(id).subscribe({
      next: (data: any) => {
        this.api.bSubject.next(data);
      },
    });
  }
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
          /* window.location.href = window.location.href */
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
  public openCart!: boolean;
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
          /* window.location.href = window.location.href; */
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
}
