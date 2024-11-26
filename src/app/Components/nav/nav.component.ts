import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { error } from 'console';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  constructor(public apiServ: ApiService){}

  ngOnInit(): void {
    this.category()
  }
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

}
