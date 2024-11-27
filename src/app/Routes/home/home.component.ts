import { NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  public item: {title: any; content: any; active?: boolean}[] = [
    {
      title: 'item1',
      content: 'content1'
    },
  ]
  public item1: {title: any; content: any; active1?: boolean}[] = [
    {
      title: 'item1',
      content: 'content1'
    },
  ]

  itemClicked1(i: number){
    this.item = this.item.map((item) => {
      item.active = false;

      return item;
    })

    this.item[i].active = true;
  }
  itemClicked2(i: number){
    this.item1 = this.item1.map((item) => {
      item.active1 = false;

      return item;
    })

    this.item1[i].active1 = true;
  }

}
