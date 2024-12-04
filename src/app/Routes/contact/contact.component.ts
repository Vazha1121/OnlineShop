import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  public help:any = [
    'https://gstore.ge/wp-content/uploads/2023/01/phone-2.svg',
    'https://gstore.ge/wp-content/uploads/2023/01/messenger-1.svg',
    'https://gstore.ge/wp-content/uploads/2023/01/email-1.svg'

  ]
  public dzagluka: any = "@"
}
