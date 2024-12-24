import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { log } from 'node:console';

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
    public cookie: CookieService,
    public actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.category();
    this.getCartData();
    this.getProdWid();
    this.getCart();
    this.apiServ.bSubject3.subscribe({
      next: (data:any) => {
        console.log(data);
        this.menuValue = data
      }
    })
   

    this.apiServ.bSubject2.subscribe((data:any) => {
      this.productsOfCart = [];
      this.productID = [];
      this.combinedCartProducts = [];
      this.userCart = data;
      this.totalPrice = this.userCart.total.price.current;
      this.totalProducts = this.userCart.total.quantity;
      this.currentPriceOnNav = data.total.price.current;
      this.dicountedPriceOnNav = data.total.price.beforeDiscount;
      this.cartProdLength = data.products.length;
        for (const item of data.products) {
          this.productsOfCart.push(item);
          this.productID.push(item.productId);
        }
        this.getProdWid();
      
    })
  }

  public logo: any = 'https://gstore.ge/wp-content/uploads/2023/10/1111-1.png';
  public categ: any;
  public dataId: any | undefined;
  public objectArray: Array<any> = [];
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

  public blueLI!: boolean;
  goLapPage() {
    this.burger = false;
    this.showSignIn = false;
    this.blueLi1 = false
    this.blueLI = true;
  }
  goGstore(){
    this.blueLI = false;
    this.blueLi1 = false
  }
  public blueLi1: boolean = false
  goPhonePage(){
    this.burger = false;
    this.showSignIn = false;
    this.blueLI = false;
    this.blueLi1 = true
  }
  public menuValue!: boolean;
  public showSignIn: boolean = false;
  openManu() {
    this.menuValue = !this.menuValue;
    this.burger = false;
  }
  openSign() {
    this.showSignIn = !this.showSignIn;
    this.burger = false;
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
        window.location.href = window.location.href
      },
    });
  }

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
  public userCart: any;
  public totalProducts: any;
  public productsOfCart: Array<any> = [];
  public productID: Array<any> = [];
  public combinedCartProducts: Array<any> = [];
  public totalPrice: any;
  getCartData() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.productsOfCart = [];
    this.productID = [];
    this.combinedCartProducts = [];

    this.apiServ.getCart(headers).subscribe({
      next: (data: any) => {
        this.userCart = data;
        this.totalPrice = this.userCart.total.price.current;
        this.totalProducts = this.userCart.total.quantity;
        for (const item of data.products) {
          this.productsOfCart.push(item);
          this.productID.push(item.productId);
        }
        this.getProdWid();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  public prodDetailIncart: any;
  getProdWid() {
    for (const item of this.productID) {
      this.apiServ.getProdWithId(item).subscribe({
        next: (data: any) => {
          const cartItem = this.productsOfCart.find(
            (cart) => cart.productId === item
          );
          if (cartItem) {
            const combinedItem = {
              ...cartItem,
              productDetails: data,
            };
            const existingProduct = this.combinedCartProducts.find(
              (product) => product.productId === combinedItem.productId
            );
            if (!existingProduct) {
              this.combinedCartProducts.push(combinedItem);
            }
          }
          this.combinedCartProducts.sort((a, b) => {
            const titleA = a.productDetails.title.toLowerCase();
            const titleB = b.productDetails.title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
          });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
  /* deleteItemFromCart */
  deleteItem(id: any) {
    this.productsOfCart = [];
    this.productID = [];
    this.combinedCartProducts = [];

    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    const body = {
      id: id,
    };
    this.apiServ.delteitemFromCart(headers, body).subscribe({
      next: (data: any) => {
        this.userCart = data;
        this.totalPrice = this.userCart.total.price.current;
        this.totalProducts = this.userCart.total.quantity;
        this.currentPriceOnNav = data.total.price.current;
        this.dicountedPriceOnNav = data.total.price.beforeDiscount;
        this.cartProdLength = data.products.length;
        for (const item of data.products) {
          this.productsOfCart.push(item);
          this.productID.push(item.productId);
        }
        this.getProdWid();
      },
    });
  }
  /* checkout */
  public trueCart: any;
  makeCheckOut() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.apiServ.checkoutCart('', headers).subscribe({
      next: (data: any) => {
        console.log(data);
        window.location.href = window.location.href;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  /* cartData; */
  public cartData!: boolean;
  public cartProdLength: any;
  public currentPriceOnNav: any;
  public dicountedPriceOnNav: any;
  getCart() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.apiServ.getCart(headers).subscribe({
      next: (data: any) => {
        this.cartData = true;
        this.cartProdLength = data.products.length;
        this.currentPriceOnNav = data.total.price.current;
        this.dicountedPriceOnNav = data.total.price.beforeDiscount;
      },
      error: (err: any) => {
        console.log(err);
        this.cartData = false;
      },
    });
  }
  public emptyCartIcon:any = `data:image/png;base64,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`
  goOnProducts() {
    this.menuValue = false;
  }
}
