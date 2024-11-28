import { NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { CarouselComponent } from '../../Components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  public slide = [
    {src: "https://gstore.ge/wp-content/uploads/2022/12/16-series-poster-website-ბანნერ-Recovered-01.png.webp"},
    {src: "https://gstore.ge/wp-content/uploads/2022/12/SURFACE-BANER-FOR-WEB-01.png.webp"}
  ]
  public banks = ["https://gstore.ge/wp-content/uploads/2024/09/ბოლო-განვდ-01.png.webp"];
  public laptop = ["https://gstore.ge/wp-content/uploads/2024/07/leptopebis-baneri-saitiza-01.png.webp"];
  public telef = ["https://gstore.ge/wp-content/uploads/2024/07/telefonebi-saitistvis-baner222-01.png.webp"];
}
