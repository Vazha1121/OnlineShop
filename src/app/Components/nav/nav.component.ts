import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  constructor(
    public apiServ: ApiService,
    public actR: Router,
    public cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.category();
    this.getCartData()
  }
  public logo: any = 'https://gstore.ge/wp-content/uploads/2023/10/1111-1.png';
  public categ: any;
  category() {
    this.apiServ.getCategory().subscribe({
      next: (data: any) => {},
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  public phoneID: any = 2;
  public pageSize: any = 20;
  public pageIndex: any = 1;
  public phoneApi: any;

  goPhonePage() {
    this.burger = false;
  }

  public menuValue: boolean = false;
  public showSignIn: boolean = false;
  openManu() {
    this.menuValue = !this.menuValue;
    this.burger = false;
  }
  openSign() {
    this.showSignIn = !this.showSignIn;
    this.burger = false
  }
  public signIn: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public myAccessToken: any;
  public myRefreshToken: any;
  public tokenIsHere!: any;

  onSubmit() {
    this.apiServ.signIn(this.signIn.value).subscribe({
      next: (data: any) => {
        this.myAccessToken = data.access_token;
        this.myRefreshToken = data.refresh_token;
        this.cookie.set('userAccToken', this.myAccessToken);
        this.showSignIn = false;
        
      },
    });
  }
  public cartData: any;
  public cartItemRaod!: string;
  public searchedText: any;
  public searchedItem: any;
  searchItem() {
    this.apiServ.searchWithKeyword(this.searchedText).subscribe({
      next: (data: any) => {
        this.searchedItem = data;
        this.apiServ.gadamzidi.next(this.searchedItem);
        if (this.searchedText == 'laptop' || this.searchedText == 'laptops') {
          this.actR.navigate(['laptops']);
        } else if (
          this.searchedText == 'phone' ||
          this.searchedText == 'phones'
        ) {
          this.actR.navigate(['phones']);
        }
      },
    });
  }
  public burger!: boolean;
  showBurgerBar() {
    this.burger = !this.burger;
  }
  /* cartData */
public totalPrice: any = []
  getCartData(){
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.apiServ.getCart(headers).subscribe({
      next: (data:any) => {
        this.cartData = data.products;
        this.totalPrice = [data.total.price]
        console.log(this.cartData);
        
        
      },
      error: (err:any) => {
        console.log("register/logim");
        
      }
    })
  }
}
