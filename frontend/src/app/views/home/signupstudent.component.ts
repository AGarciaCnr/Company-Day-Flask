import { Component, OnInit, OnDestroy,ElementRef } from '@angular/core';

@Component({
  selector: 'app-signupStudent',
  template: `<div class="landing">
  <app-header></app-header>
  <app-sus></app-sus>
  </div>`
})
export class SignUpStudent implements OnInit, OnDestroy {
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
