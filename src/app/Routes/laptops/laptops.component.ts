import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


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
    this.getInfo()
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
  getInfo(){
    this.api.gadamzidi.subscribe((data:any) => {
      console.log(data);
      this.prods = data.products
    })
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
          }
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
      },
    });
  }
  public cartData:any;
  addInCart(){
    const headers = new HttpHeaders({ 
      accept: 'application/json',
      'Authorization': `Bearer ${this.cookie.get("userAccToken")}`})
    this.api.getCart(headers).subscribe({
      next: (data:any) => {
        console.log(data);
        this.cartData = data;
      },
      error: (err:any) => {
        console.log(err);
        
      }
    })
  }

}
