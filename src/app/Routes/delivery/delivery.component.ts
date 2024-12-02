import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery',
  imports: [],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent {
  public delivery: any = [
    'https://gstore.ge/wp-content/uploads/2022/12/delivery-img-icon-1-1.svg',
    'https://gstore.ge/wp-content/uploads/2022/12/delivery-img-icon-2-1.svg',
    'https://gstore.ge/wp-content/uploads/2022/12/delivery-img-icon-3-1.svg',
    'https://gstore.ge/wp-content/uploads/2022/12/delivery-img-icon-4-1.svg',
    'https://gstore.ge/wp-content/uploads/2023/01/delivery-return-img-1.jpg.webp',
  ];
  public help:any = [
    'https://gstore.ge/wp-content/uploads/2023/01/phone-2.svg',
    'https://gstore.ge/wp-content/uploads/2023/01/messenger-1.svg',
    'https://gstore.ge/wp-content/uploads/2023/01/email-1.svg'

  ]
  public dzagl:string = '@'
}
