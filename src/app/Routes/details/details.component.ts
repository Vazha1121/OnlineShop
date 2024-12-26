import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(
    public actRoute: ActivatedRoute,
    public api: ApiService,
    public cookie: CookieService
  ) {}
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.getPara();
    this.prodDetail();
  }

  public dataId: string | undefined;
  getPara() {
    /* this.actRoute.params.subscribe((data: Params) => {
    this.dataId = data['id']
  }) */
    this.route.params.subscribe((params) => {
      console.log(params);
      this.dataId = params['id'];
    });
  }

  public images: any;
  public detail: any;
  public bigPhoto: any;
  public detailPrice: any;
  public dataStock: any;
  public prodId:any;
  public paymentImg: string =
    'https://gstore.ge/wp-content/uploads/2022/12/payment-methods-1.jpg.webp';
  prodDetail() {
    this.api.getProdId(this.dataId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dataStock = data.stock;
        this.detail = data;
        this.images = data.images;
        this.bigPhoto = data.images[0];
        this.detailPrice = data.price.discountPercentage;
        console.log(data._id);
        this.prodId = data._id
        console.log(this.prodId);
        
      },
    });
  }
  chngPhoto(photo: any) {
    this.bigPhoto = photo;
  }
  public raod: number = 1;
  plusQuant() {
    this.raod++;
  }
  minusQuant() {
    this.raod--;
  }
  /* create cart */
  public kalata!: boolean;
  public kalataRaiod: any;
  public openCart!: boolean;
  public cartData!: boolean;
  createCart() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.api
      .createCart(
        {
          id: this.prodId,
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
  addCart() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.api
      .addCart(
        {
          id: this.prodId,
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
