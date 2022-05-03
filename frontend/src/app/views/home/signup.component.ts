import { Component, OnInit, OnDestroy,ElementRef } from '@angular/core';

@Component({
  selector: 'app-signUp',
  template: `<div class="landing">
  <app-header></app-header>
  <app-su></app-su>
  </div>`
})
export class SignUp implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = '#B8D4FB';
  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }
  

}
