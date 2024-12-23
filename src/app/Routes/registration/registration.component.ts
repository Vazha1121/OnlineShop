import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../Services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  constructor(
    public rout: Router,
    public cookie: CookieService,
    public api: ApiService,
    public actR: Router
  ) {}

  ngOnInit(): void {
    this.getToken = this.cookie.get('userAccToken');
    this.showAuth();
  }
  public login: boolean = false;

  public getToken: any;
  changeSign() {
    this.login = !this.login;
    console.log(this.login);
  }
  privacy() {
    this.rout.navigate(['privacypolicy']);
  }
  public authData: any;
  public firstName: any;
  public lastName: any;
  public age: any;
  public gender: any;
  public mail: any;
  public phone: any;
  public img: any;
  public address: any;
  public postalCode: any;
  showAuth() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    this.api.auth(headers).subscribe({
      next: (data: any) => {
        console.log(data);
        this.authData = data;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.gender = data.gender;
        this.mail = data.email;
        this.phone = data.phone;
        this.img = data.avatar;
        this.address = data.address;
        this.postalCode = data.zipcode;
      },
    });
  }

  userOut() {
    this.api.userLeave(this.authData);
    this.cookie.delete('userAccToken');
    this.actR.navigate(['/']);
    console.log('Aaa');
  }

  /* signIn Logic */
  public myAccessToken: any;
  public myRefreshToken: any;
  public tokenIsHere!: any;
  public showSignIn: boolean = false;
  public signIn: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.api.signIn(this.signIn.value).subscribe({
      next: (data: any) => {
        this.myAccessToken = data.access_token;
        this.myRefreshToken = data.refresh_token;
        this.cookie.set('userAccToken', this.myAccessToken);
        this.showSignIn = false;
        if(this.myAccessToken = data.access_token){
          this.actR.navigate(["/"])
        }
      },
      error: (err:any) => {
        alert("გადაამოწმეთ მეილი და პაროლი")
      }
    });
  }
}
