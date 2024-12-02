import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { error } from 'console';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  constructor(public apiServ: ApiService, public actR:Router){}

  ngOnInit(): void {
    this.category()
  }
  public logo: any = 'https://gstore.ge/wp-content/uploads/2023/10/1111-1.png'
  public categ:any;
  category(){
    this.apiServ.getCategory().subscribe({
      next: (data:any) => {
        console.log(data);
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
}
