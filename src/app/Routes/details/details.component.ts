import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit{
  constructor(public actRoute: ActivatedRoute, public api: ApiService) {
  }
route = inject(ActivatedRoute)
ngOnInit(): void {
  this.getPara()
  this.prodDetail()
  
}


public dataId: string | undefined;
getPara(){
  /* this.actRoute.params.subscribe((data: Params) => {
    this.dataId = data['id']
  }) */
    this.route.params.subscribe((params) => {
      console.log(params);
      this.dataId = params['id']
      
    })
}

public images: any;
public detail:any;
public bigPhoto:any;
public detailPrice:any
  prodDetail(){
    this.api.getProdId(this.dataId).subscribe({
      next: (data:any) => {
        console.log(data);
        this.detail = data
        this.images = data.images
        this.bigPhoto = data.images[0]
        this.detailPrice = data.price.discountPercentage
        console.log(data._id);
        
      }
    })
  }
  chngPhoto(photo:any){
   this.bigPhoto = photo;
  }
  public raod:number = 1;
  plusQuant(){
    this.raod++
  }
  minusQuant(){
    this.raod--
  }
  public paymentImg: string = 'https://gstore.ge/wp-content/uploads/2022/12/payment-methods-1.jpg.webp'
}
