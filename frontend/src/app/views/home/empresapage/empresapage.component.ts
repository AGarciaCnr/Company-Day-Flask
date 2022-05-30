import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input, Injectable } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetShareComponent } from '../../../shared/components/bottom-sheet-share/bottom-sheet-share.component';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-empresapage',
  templateUrl: './empresapage.component.html',
  styleUrls: ['./empresapage.component.scss']
})

export class EmpresaPageComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  }
  public selected:string;
  public where:string;
  task: Task = {
    name: 'Select all grades or',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Short animated films', completed: false, color: 'primary'},
      {name: 'Video Games', completed: false, color: 'primary'},
      {name: 'Digital Design', completed: false, color: 'primary'},
      {name: 'Software Engineering (Apps, Virtual Reality…)', completed: false, color: 'primary'},
    ],
  };
  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }


  ngOnInit() {
  }
  
  ngAfterViewInit() {
  }
  getEvent(value) {
    console.log(value);
  }
logout() {
    localStorage.removeItem("User");
    this.router.navigateByUrl('/home/LandingPage');
  }
  
}
