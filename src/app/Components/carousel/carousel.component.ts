import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

@Input() slides:any;

 currentSlide = 0;

 constructor(){}

 onPrev(){
  const previous = this.currentSlide - 1;
  this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  console.log(this.currentSlide);
  
 }
 onNext(){
  const next = this.currentSlide + 1;
  this.currentSlide = next === this.slides.length ? 0 : next;
  console.log(this.currentSlide);
  
 }
}
