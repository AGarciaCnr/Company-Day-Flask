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
  data = [];
  checked = false;
  checkbox_updated = [];

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('User'));
    if (this.user['isAlumn'] == 1)
      this.isShown = false;
      if (this.user['isAlumn'] == 0)
      this.isShown = true;


      this.http.get<any>("http://127.0.0.1:5000/API_2/admin/").subscribe(
        (res) => {
          this.data = res.data;
        },
        (err) => console.log(err)
      );
  
  }
  
  pressTest() {
    console.log(this.data)
  }

  ngOnInit() {
  }
  
  submit() {
  }
  
  check(e, id){
//    console.log(e.target.checked)
    this.checkbox_updated[id] = e.target.checked;
  }

  test(id) {
    var test = "object-" + id;
    console.log((<HTMLInputElement>document.getElementById(test)).value);
    console.log(id);
  }

  deleteRow(id, isAdmin) {
    if (this.checkbox_updated[id] == true) {
      var formData = new FormData();
      formData.append('id', id);
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('Content-Type', 'application/json');
  
  
      this.http.post<any>("http://127.0.0.1:5000/API_2/admin/delete", formData).subscribe(
        (res) => {
        },
        (err) => console.log(err)
      );
    }
    var formData1 = new FormData();
    formData1.append('id', id);
    formData1.append('isAlumn', isAdmin);
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');


    this.http.post<any>("http://127.0.0.1:5000/API_2/admin/update", formData1).subscribe(
      (res) => {
        if(res["status"] == "OK") {
          window.location.reload();
        }

      },
      (err) => console.log(err)
    );

  }
  logout() {
    localStorage.removeItem("User");
    this.router.navigateByUrl('/home/LandingPage');
  }
  
}
