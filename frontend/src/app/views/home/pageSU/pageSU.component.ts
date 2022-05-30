import { Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-su',
  templateUrl: './pageSU.component.html',
  styleUrls: ['./pageSU.component.scss']
})
export class SUComponent implements OnInit {
  username: string;
  password: string;
  email: string;

  email_signup: string;
  username_signup: string;
  password_signup: string;
  fname_signup: string;
  lname_signup: string;
  passwordconfirmation_signup: string;
  checkbox_admin: boolean;
  myModel: string;

  token: string;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    if (localStorage.getItem("User") !== null) {
      this.router.navigateByUrl('/home/UserPage');
    }
  }
  
  ngOnInit() {
  }
  
  submit(){
  }
  login() {
    var formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');


    this.http.post<any>("http://127.0.0.1:5000/API_2/login/", formData).subscribe(
      (res) => {
        if(res['status'] == "ERROR") {
          console.log(res['message']);
        } else {
          console.log(res['isAlumn'])
          this.token = res['access_token'];
          localStorage.setItem('User', JSON.stringify(res));
          localStorage.setItem('Token', this.token);
          localStorage.setItem('Type', "Alumnos");
          this.router.navigateByUrl('/home/UserPage');
        }
        

      },
      (err) => console.log(err)
    );
  }
  signup() {
    var admin_signup = String(!this.checkbox_admin);
    if (admin_signup == "true") {
      admin_signup = "1";
    }
    if (admin_signup == "false") {
      admin_signup = "0";
    }
    admin_signup = "1";
    console.log(admin_signup);

    if (this.password_signup == this.passwordconfirmation_signup) {
      var formData = new FormData();

      formData.append('email', this.email_signup);
      formData.append('password', this.password_signup);
      formData.append('isAlumn', admin_signup);

      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('Content-Type', 'application/json');

      this.http.post<any>("http://127.0.0.1:5000/API_2/uRegister/", formData).subscribe(
        (res) => {
          if(res['status'] == "ERROR") {
            console.log(res['message']);
          } else {
            console.log(res)
//            localStorage.setItem('User', JSON.stringify(res));
 //           this.router.navigateByUrl('/home/UserPage');
          }
          
  
        },
        (err) => console.log(err)
      );
  
  }
  }
  
}
