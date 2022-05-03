import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-one',
  template: `<div class="landing">
  <app-header></app-header>
  <app-presentation></app-presentation>
  <app-mission></app-mission>
  <app-activities></app-activities>
  <app-services></app-services>
  <app-cta></app-cta>
  <app-footer></app-footer>
  </div>`
})
export class HomeOneComponent implements OnInit, OnDestroy {
  constructor(
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  

}
