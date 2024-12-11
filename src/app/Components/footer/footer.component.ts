import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
constructor(public api: ApiService) {}
ngOnInit(): void {
  this.getBrands()
}
  public dzagluka: any = "@"

  public brandVar:any
  getBrands(){
    this.api.brands().subscribe({
      next: (data:any) => {
        this.brandVar = data
      },
      error: (alter:any)=>{
        console.log(alter);
        
      }
    })
  }
}
