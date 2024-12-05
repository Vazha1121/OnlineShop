import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public isShow: boolean = false
@Output() traileri : EventEmitter<any> = new EventEmitter()
@Input() moitane = this.isShow
gaushvi(){
  this.traileri.emit(this.isShow)
}
}
