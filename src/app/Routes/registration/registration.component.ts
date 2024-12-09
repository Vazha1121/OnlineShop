import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {



  public login: boolean = false

  changeSign(){
    this.login = !this.login
    console.log(this.login);
    
  }
}
