import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectableObservable } from "rxjs"
import { publish } from "rxjs/operators";
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sus',
  templateUrl: './pageSUS.component.html',
  styleUrls: ['./pageSUS.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class SUSComponent implements OnInit {

  title = 'newMat';

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selectedFiles;
  password: string;
  email: string;
  token: string;

  choiceSelected: string;
  choice: string[] = ['yes', 'no'];
  selectFile(event) {
    // here we have the result of the picture
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
  }
  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) { 
    if (localStorage.getItem("User") !== null) {
      this.router.navigateByUrl('/home/EmpresaPage');
    }
  }

  ngOnInit() {
    let MOBILE_PATTERN = /[0-9\+\-\ ]/;
    this.firstFormGroup = this._formBuilder.group({
      organization_name: ['', Validators.required],
      phone_organization: ['', [Validators.pattern(MOBILE_PATTERN)]],
      contact_organization: ['', Validators.required],
      email_organization: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      organization_address: ['', Validators.required],
      organization_city: ['', Validators.required],
      organization_state: ['', Validators.required],
      organization_postalcode: ['', Validators.required],
      organization_country: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      organization_website: ['', Validators.required],
      organization_looking: ['', Validators.required],
      organization_validate: ['', Validators.required]
    });
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
          localStorage.setItem('Type', "Empresa");
          this.router.navigateByUrl('/home/EmpresaPage');
        }
        

      },
      (err) => console.log(err)
    );
  }

  submit() {
    console.log(this.firstFormGroup.value.organization_name);
    console.log(this.secondFormGroup.value.organization_city);
    console.log(this.thirdFormGroup.value.organization_website);
    
    var formData = new FormData();

    formData.append('name', this.firstFormGroup.value.organization_name);
    formData.append('contactPersonName', this.firstFormGroup.value.contact_organization);
    formData.append('contactPhone', this.firstFormGroup.value.phone_organization);
    formData.append('contactEmail', this.firstFormGroup.value.email_organization);
    formData.append('address', this.secondFormGroup.value.organization_address);
    formData.append('city', this.secondFormGroup.value.organization_city);
    formData.append('province', this.secondFormGroup.value.organization_state);
    formData.append('postalCode', this.secondFormGroup.value.organization_postalcode);
    formData.append('country', this.secondFormGroup.value.organization_country);
    formData.append('website', this.thirdFormGroup.value.organization_website);
    formData.append('lookingForCandidates', this.thirdFormGroup.value.organization_looking);


    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    this.http.post<any>("http://127.0.0.1:5000/API_2/cRegister/", formData).subscribe(
      (res) => {
        if (res['status'] == "ERROR") {
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
