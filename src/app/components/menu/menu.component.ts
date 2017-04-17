import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'jl-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

  public visible: boolean = true;
  public open: boolean;
  public routes = [
    { label: 'Home', link: '/home' },
    { label: 'Details', link: '/wedding-details' },
    { label: 'RSVP', link: '/rsvp' }
  ];

  private menuStateSub;
  private routerSub;

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.menuStateSub = this.menuService.menuState.subscribe(open => this.open = open);
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.visible = (event.url !== '/' && event.url !== '/home');
      }
      if (event instanceof NavigationEnd) {
        this.visible = event.urlAfterRedirects !== '/home';
      }
    });
  }

  ngOnDestroy() {
    this.menuStateSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  public toggleMenu() {
    this.menuService.setMenuState(!this.open);
  }

  public openMenu() {
    this.menuService.setMenuState(true);
  }

  public closeMenu() {
    this.menuService.setMenuState(false);
  }

  public onClickRoute() {
    this.closeMenu();
  }
}
