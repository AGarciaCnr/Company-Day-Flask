import { AfterViewInit, Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetShareComponent } from '../../../shared/components/bottom-sheet-share/bottom-sheet-share.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserPageComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  
  public carouselOptions: NguCarouselConfig;
  public portfolios = [{
    photo: 'assets/images/sq-10.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus 
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project One',
  }, {
    photo: 'assets/images/sq-11.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus 
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Two',
  }, {
    photo: 'assets/images/sq-12.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus 
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Three',
  }, {
    photo: 'assets/images/sq-13.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus 
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Four',
  }, {
    photo: 'assets/images/sq-15.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus 
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Five',
  }, {
    photo: 'assets/images/sq-16.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus 
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Six',
  }]
  
  constructor(private bottomSheet: MatBottomSheet, private _cdr: ChangeDetectorRef,private router: Router) { 
  }

  openShareComponent(): void {
    this.bottomSheet.open(BottomSheetShareComponent);
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

  logout() {
    localStorage.removeItem("User");
    this.router.navigateByUrl('/home/LandingPage');
  }
  

}
