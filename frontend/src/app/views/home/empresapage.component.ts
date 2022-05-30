import { Component, OnInit, OnDestroy,ElementRef } from '@angular/core';

@Component({
  selector: 'app-empresaP',
  template: `<div class="landing">
  <app-header></app-header>
  <br/><br/><br/>
  <br/><br/><br/>
  <app-empresapage></app-empresapage>
  </div>`
})

//<app-userpage></app-userpage>

export class empresapage implements OnInit, OnDestroy {
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
