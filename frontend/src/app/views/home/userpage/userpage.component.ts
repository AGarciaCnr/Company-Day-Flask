import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input, Injectable } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetShareComponent } from '../../../shared/components/bottom-sheet-share/bottom-sheet-share.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserPageComponent implements OnInit {
  public carouselOptions: NguCarouselConfig;
  public selected = "All";
  public selectedGrade = "All";
  all_portfolios = [{
    photo: 'assets/images/student.png',
    text: `Animation and VFX short films, video games, design portfolios, apps, extended realities experiences… `,
    title: 'Project One',
    type: ['Student pitches', 'All'],
    date: "May 30 | 17h00",
    where: 'On Campus',
    grade: ["Diseño Digital", 'All'],
  }, {
    photo: 'assets/images/ubisoft.jpg',
    text: `get to know what companies are looking for, meet recruiters and professionals, take advantage to obtain first-hand information. `,
    title: 'Project Two',
    type: ['Company Talks', 'All'],
    date: "May 25 | 11h00",
    where: 'On Campus',
    grade: ["Ingeniería del Software", 'All'],
  },
  {
    photo: 'assets/images/EA.webp',
    text: `A place where companies and U-tad’s talents can meet, discuss their projects and explore opportunities.`,
    title: 'Project Two',
    type: ['Company Fair', 'All'],
    date: "June 05 | 13h00",
    where: 'On Campus',
    grade: ["Ingeniería del Software", 'All'],
  },{
    photo: 'assets/images/thales.png',
    text: `A place where companies and U-tad’s talents can meet, discuss their projects and explore opportunities. `,
    title: 'Project Two',
    type: ['Company Fair', 'All'],
    date: "June 05 | 16h00",
    where: 'Online',
    grade: ["Matemáticas", 'All'],
  }, {
    photo: 'assets/images/thales.png',
    text: `get to know what companies are looking for, meet recruiters and professionals, take advantage to obtain first-hand information. `,
    title: 'Project Three',
    type: ['Company Talks', 'All'],
    date: "June 19 | 13h00",
    where: 'On Campus',
    grade: ["Matemáticas", 'All'],
  }, {
    photo: 'assets/images/pixar.jpg',
    text: `get to know what companies are looking for, meet recruiters and professionals, take advantage to obtain first-hand information. `,
    title: 'Project Four',
    type: ['Company Talks', 'All'],
    date: "June 18 | 14h00",
    where: 'Online',
    grade: ["Animación", 'All'],
  }, {
    photo: 'assets/images/pixar.jpg',
    text: `You will be able to apply for the offers and companies you 
    are more interested in and talk about your future with them.. `,
    title: 'Project Five',
    type: ['Speed Meetings', 'All'],
    date: "June 03 | 16h00",
    where: 'On Campus',
    grade: ["Animación", 'All'],
  }, {
    photo: 'assets/images/ubisoft.jpg',
    text: `You will be able to apply for the offers and companies you are more interested in and talk about your future with them. `,
    title: 'Project Six',
    type: ['Speed Meetings', 'All'],
    date: "June 03 | 11h00",
    where: 'On Campus',
    grade: ["Ingeniería del Software", 'All'],
  }]

  public portfolios = this.all_portfolios;

  user: string;
  isShown: boolean = false ;
  data = [];
  checked = false;
  checkbox_updated = [];
  token = localStorage.getItem("Token");
  types: string = "All";
  grade: string = "All";

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router, private bottomSheet: MatBottomSheet, private _cdr: ChangeDetectorRef) {
    this.user = JSON.parse(localStorage.getItem('User'));
    if (this.user['isAlumn'] == 1)
      this.isShown = false;
      if (this.user['isAlumn'] == 0)
      this.isShown = true;


      this.http.get<any>("http://127.0.0.1:5000/API_2/admin/?jwt=" + this.token).subscribe(
        (res) => {
          this.data = res.data;
        },
        (err) => console.log(err)
      );
  
  }
  openShareComponent(): void {
    this.bottomSheet.open(BottomSheetShareComponent);
  }


  pressTest() {
    console.log(this.data)
  }

  ngOnInit() {
    this.carouselOptions = {
      grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      interval: {timing: 4000},
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    }
  }
  
  ngAfterViewInit() {
    this._cdr.detectChanges();
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
  getEvent(value) {
    console.log(value);
    this.types = value;
    this.parsePortfolio();
}

getEventGrade(value) {
  console.log(value);
  this.grade = value;
  this.parsePortfolio();
}

parsePortfolio() {
  var parse = [];
  this.all_portfolios.forEach( (element) => {
    if ((element.grade.some(e => e === this.grade) == true) && (element.type.some(e => e === this.types) == true )) {
      parse.push(element);
    }
  });
  this.portfolios = parse;
}

logout() {
    localStorage.removeItem("User");
    this.router.navigateByUrl('/home/LandingPage');
  }
  
}
