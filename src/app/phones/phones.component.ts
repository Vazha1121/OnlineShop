import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { log } from 'console';

@Component({
  selector: 'app-phones',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './phones.component.html',
  styleUrl: './phones.component.scss',
})
export class PhonesComponent implements OnInit {
  constructor(public api: ApiService) {
    this.brandsApi();
    this.getProds(this.pageID);
  }

  ngOnInit(): void {}

  public minPrice: number = 0;
  public maxPrice: number = 6000;
  public priceGap: number = 100;
  get progressLeft(): string {
    return `${(this.minPrice / 6000) * 100}%`;
  }
  get progressRight(): string {
    return `${100 - (this.maxPrice / 6000) * 100}%`;
  }
  onInputChange() {
    if (this.maxPrice - this.minPrice < this.priceGap) {
      this.minPrice = Math.min(this.minPrice, this.maxPrice - this.priceGap);
      this.maxPrice = Math.max(this.maxPrice, this.minPrice + this.priceGap);
    }
  }
  onRangeChange() {
    if (this.maxPrice - this.minPrice < this.priceGap) {
      this.maxPrice = this.minPrice + this.priceGap;
    }
  }
  public brandUl: any;
  public apple: any;
  public xiaomi: any;
  public phoneBrands: any = [
    {
      brands: 'apple',
    },
    {
      brands: 'samsung',
    },
    {
      brands: 'xiaomi',
    },
    {
      brands: 'honor',
    },
    {
      brands: 'oneplus',
    },
  ];
  public brandO: any;
  public Xiaomi: any = 'xiaomi';
  brandsApi() {
    this.api.brands().subscribe({
      next: (data: any) => {
        this.brandUl = data;
        console.log(this.brandUl);
        this.brandO = [
          {
            brand: this.brandUl[1],
          },
          {
            brand: this.brandUl[2],
          },
          {
            brand: this.brandUl[3],
          },
          {
            brand: this.brandUl[4],
          },
          {
            brand: this.brandUl[5],
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
        console.log(data);
        this.prods = data.products;
        console.log(this.prods);
        console.log(id);
      },
    });
  }
  public catId: any = 2;
  public pageSize: any = 12;
  public prods: any;
  public pageRaod: any = [1];
  public pageID: any = 0;
  getProds(ID: any) {
    ID++;
    this.pageID = ID;
    this.api
      .getCategoryWithId(this.catId, this.pageID, this.pageSize)
      .subscribe({
        next: (data: any) => {
          this.prods = data.products;
          console.log(this.prods);
        },
      });
  }
}
