import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'jl-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

  public visible: boolean;
  public open: boolean;
  public routes = [
    { label: 'Home', link: '/home' },
    { label: 'Details', link: '/wedding-details' },
    { label: 'RSVP', link: '/rsvp' }
  ];

  private menuStateSub;
  private menuVisibleSub;

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuStateSub = this.menuService.menuState.subscribe(open => this.open = open);
  }

  ngOnDestroy() {
    this.menuStateSub.unsubscribe();
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
}
