import { Component, OnInit } from '@angular/core';
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

ngOnInit(): void {
  this.getPara()
  this.prodDetail()
}
public dataId: string | undefined;
getPara(){
  this.actRoute.params.subscribe((data: Params) => {
    this.dataId = data['id']
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
      }
    })
  }
  chngPhoto(photo:any){
   this.bigPhoto = photo;
    
  }
}
