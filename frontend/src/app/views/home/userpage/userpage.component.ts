import { Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserPageComponent implements OnInit {
  user: string;
  isShown: boolean = false ;
  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('User'));
    console.log(this.user)
    if (this.user['isAlumn'] == 1)
      this.isShown = false;
      if (this.user['isAlumn'] == 0)
      this.isShown = true;
  }
  
  ngOnInit() {
  }
  
  submit() {
  }

  logout() {
    localStorage.removeItem("User");
    this.router.navigateByUrl('/home/LandingPage');
  }
  
}
