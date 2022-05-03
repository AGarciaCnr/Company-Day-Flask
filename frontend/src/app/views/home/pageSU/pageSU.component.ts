import { Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tutorials';
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

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}
  
  ngOnInit() {
  }
  
  submit(){
  }
  login() {
    console.log(this.email);
    console.log(this.password);
    var formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    var result = from( // wrap the fetch in a from if you need an rxjs Observable
      fetch(
        "http://127.0.0.1:5000/API_2/login/",
        {
          body: formData,
          headers: requestHeaders,
          method: 'POST',
          mode: 'no-cors'
        }
      )
    );


  }
  signup() {
    var nombre_completo = this.fname_signup + " " + this.lname_signup;
    if (this.password_signup == this.passwordconfirmation_signup) {
      var formData = new FormData();
//      formData.append('nombre_completo', nombre_completo);
      formData.append('email', this.email_signup);
      formData.append('password', this.password_signup);
      formData.append('isAlumn', "1");
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('Content-Type', 'application/json');

      var result = from( // wrap the fetch in a from if you need an rxjs Observable
        fetch(
          "http://127.0.0.1:5000/API_2/uRegister/",
          {
            body: formData,
            headers: requestHeaders,
            method: 'POST',
            mode: 'no-cors'
          }
        )
      );
    }
  }
  
}
