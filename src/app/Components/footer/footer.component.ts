import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
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
