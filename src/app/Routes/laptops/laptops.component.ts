import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-laptops',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './laptops.component.html',
  styleUrl: './laptops.component.scss',
})
export class LaptopsComponent implements OnInit {
  constructor(public api: ApiService) {}
  ngOnInit(): void {
    this.brandsApi();
    this.getProds(this.pageID);
  }
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
  brandsApi() {
    this.api.brands().subscribe({
      next: (data: any) => {
        this.brandUl = data;
      },
      error: (err: any) => console.log(err),
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
      next: (data: any) => {
        this.prods = data.products;
      },
    });
  }
}
