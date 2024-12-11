import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
constructor(public rout: Router){}


  public login: boolean = false

  changeSign(){
    this.login = !this.login
    console.log(this.login);
    
  }
  privacy(){
    this.rout.navigate(['privacypolicy'])
  }
}
