import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  constructor(public apiServ: ApiService, public actR:Router, public cookie: CookieService){}

  ngOnInit(): void {
    this.category()
  }
  public logo: any = 'https://gstore.ge/wp-content/uploads/2023/10/1111-1.png'
  public categ:any;
  category(){
    this.apiServ.getCategory().subscribe({
      next: (data:any) => {
        this.categ = data;
      },
      error: (err:any) => {
        console.log(err);
        
      }
    })
  }
  goOnlapPage(){
this.actR.navigate(['laptops'])
  }
  public phoneID:any = 2;
  public pageSize:any = 20;
  public pageIndex:any = 1;
  public phoneApi:any
  goPhonePage(){
    this.actR.navigate(['phones'])
  }
public menuValue: boolean = false
public showSignIn:boolean = false
  openManu(){
    this.menuValue = !this.menuValue
  }
  openSign(){
    this.showSignIn = !this.showSignIn
  }
  public signIn:FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  public myAccessToken:any;
  public myRefreshToken:any;
  onSubmit(){
    this.apiServ.signIn(this.signIn.value).subscribe({
      next: (data:any) => {
        console.log(data);
        this.myAccessToken = data.access_token;
        this.myRefreshToken = data.refresh_token
        this.cookie.set("userAccToken", this.myAccessToken)
      }
    })
    
  }
  public cartData:any;
  addInCart(){
    this.apiServ.getCart().subscribe({
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
