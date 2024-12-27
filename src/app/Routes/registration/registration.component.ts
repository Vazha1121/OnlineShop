import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../Services/api.service';
import { HttpHeaders } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
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
        if ((this.myAccessToken = data.access_token)) {
          this.actR.navigate(['/']);
        }
      },
      error: (err: any) => {
        alert('გადაამოწმეთ მეილი და პაროლი');
      },
    });
  }
  /* registration */
   public strongPass: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
   public showAcception: any;
   public showRegretion: any;
   public showAlert!:boolean;
  public register: FormGroup = new FormGroup({
    firstName: new FormControl('' , [Validators.required]),
    lastName: new FormControl('' , [Validators.required]),
    age: new FormControl('' , [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('' , [Validators.required,Validators.pattern(this.strongPass)]),
    address: new FormControl('' , [Validators.required]),
    phone: new FormControl('' , [Validators.required]),
    zipcode: new FormControl('' , [Validators.required,Validators.pattern('')]),
    avatar: new FormControl('' , [Validators.required]),
    gender: new FormControl('' , [Validators.required]),
  });
  makeRegister() {
    this.showAlert = true;
    console.log(this.showAlert);
    
    this.api.signUp(this.register.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.showAcception = data
        
      },
      error: (err:any) => {
        this.showRegretion = err
      }
    });
  }
  diax(){
    this.showAlert = false
    console.log(this.showAlert);
    
  }
  logValidation(){
    console.log(this.register.value.error);
  }
  /* changePass */
  public chngPass: FormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });
  makePassChange() {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.cookie.get('userAccToken')}`,
    });
    const oldNewPass = {
      oldPass: 'Vazha1121',
      newPass: 'Vajiko2003@',
    };
    this.api.changePassword(this.chngPass.value, headers).subscribe({
      next: (data: any) => {
        console.log(data);
        console.log(this.chngPass);
      },
    });
  }
}
