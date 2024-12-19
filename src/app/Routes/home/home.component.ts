import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { CarouselComponent } from '../../Components/carousel/carousel.component';
import { ApiService } from '../../Services/api.service';
import { RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent,CurrencyPipe,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
constructor(public api: ApiService, public cookie: CookieService){ }

ngOnInit(): void {
  this.showLaptops()
  this.showTelphone()

}

  public slide = [
    {src: "https://gstore.ge/wp-content/uploads/2022/12/16-series-poster-website-ბანნერ-Recovered-01.png.webp"},
    {src: "https://gstore.ge/wp-content/uploads/2022/12/SURFACE-BANER-FOR-WEB-01.png.webp"}
  ]
  public banks = ["https://gstore.ge/wp-content/uploads/2024/09/ბოლო-განვდ-01.png.webp"];
  public laptop = ["https://gstore.ge/wp-content/uploads/2024/07/leptopebis-baneri-saitiza-01.png.webp"];
  public telef = ["https://gstore.ge/wp-content/uploads/2024/07/telefonebi-saitistvis-baner222-01.png.webp"];

public laps:any;
showLaptops() {
  this.api.getCategoryWithId(1,1,6).subscribe({
    next: (data:any) => {
      console.log(data);
      this.laps = data.products;
      console.log(this.laps);
      
    },
    error: (err:any)=> {
      console.log(err);
      
    }
  })
  
}
public mobiles :any;
showTelphone(){
 this.api.getWithBrandName("apple",1,10).subscribe({
  next: (data:any) => {
    console.log(data);
    this.mobiles = data.products;
    
  }
 })   
}
seeDetails(id:any){
  console.log(id);
  
}
public kalata!: boolean;
public kalataRaiod:any;
createCart(id:any){  
  const headers = new HttpHeaders({ 
    accept: 'application/json',
    'Authorization': `Bearer ${this.cookie.get("userAccToken")}`})
  this.api.createCart({
    "id": id,
    "quantity": 1
  },headers).subscribe({
    next: (data:any) => {
      console.log(data);
      this.kalata = true
      this.kalataRaiod = data.total.quantity;

      
    },
    error: (err:any) => {
      alert('კალათა უკვე შექმნილია')
    }
  })
}
addCart(id:any){
  const headers = new HttpHeaders({ 
    accept: 'application/json',
    'Authorization': `Bearer ${this.cookie.get("userAccToken")}`})
  this.api.addCart({
    "id": id,
    "quantity": 1
  },headers).subscribe({
    next: (data:any) => {
      console.log(data);
      this.kalataRaiod = data.total.quantity;
      console.log(this.kalataRaiod);
      
    },
    error: (err:any) => {
      alert('კალათა უკვე შექმნილია')
    }
  })
}
}
