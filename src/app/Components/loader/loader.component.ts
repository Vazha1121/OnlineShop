import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit{
constructor(public api:ApiService){}

public isLoading:any;
ngOnInit(): void {
  this.api.loading.subscribe((data:any) => {
    console.log(data)
    this.isLoading = data;
    
  })
}
}
