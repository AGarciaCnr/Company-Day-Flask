import { Component, OnInit,Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ConnectableObservable } from "rxjs"
import { publish } from "rxjs/operators";
import { map} from 'rxjs/operators';
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

  choiceSelected: string;
  choice: string[] = ['yes', 'no'];
  selectFile(event) {
    // here we have the result of the picture
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
  }
  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}
  
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
  
  submit(){
      console.log(this.firstFormGroup.value);
      console.log(this.secondFormGroup.value);
      console.log(this.thirdFormGroup.value);
      const formData = new FormData()
/*        formData.append('username', 'Chris');
  //      return this.http.post(baseUrl, this.thirdFormGroup);
      var observable = this.http.post(baseUrl, formData)
      .map(response => response.json()) // in case you care about returned json       
      .publishReplay(); // would be .publish().replay() in RxJS < v5 I guess
      observable.connect();
    return observable; */
  }
}
