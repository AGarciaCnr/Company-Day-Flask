import { Component, OnInit, HostListener, HostBinding, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW_PROVIDERS, WINDOW } from '../../../shared/helpers/window.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isConnected: boolean = false ;
  type_user: string;

  isFixed;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private router: Router
  ) {
    if (localStorage.getItem("User") !== null) {
      this.type_user = localStorage.getItem("Type");
      this.isConnected = true;
    }
   }

  ngOnInit() {
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if(offset > 10) {
      this.isFixed = true
    } else {
      this.isFixed = false;
    }
  }

  @HostBinding("class.menu-opened") menuOpened = false;

  toggleMenu() {
    this.menuOpened = !this.menuOpened
  }

  buyEgret() {
    this.window.open('https://themeforest.net/item/egret-angular-4-material-design-admin-template/20161805?ref=mh_rafi');
  }
  logout() {
    localStorage.removeItem("User");
    localStorage.removeItem("Type");
    this.isConnected = false;
    this.router.navigateByUrl('/home/LandingPage');
  }
}
