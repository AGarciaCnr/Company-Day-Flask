import { Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}
  
  ngOnInit() {
  }
  
  submit(){
  }
  
}
