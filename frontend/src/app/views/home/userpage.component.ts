import { Component, OnInit, OnDestroy,ElementRef } from '@angular/core';

@Component({
  selector: 'app-userP',
  template: `<div class="landing">
  <app-header></app-header>
  <app-userpage></app-userpage>
  </div>`
})

//<app-userpage></app-userpage>

export class userpage implements OnInit, OnDestroy {
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
