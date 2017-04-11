import { Component, OnInit, OnDestroy } from '@angular/core';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'jl-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

  public open: boolean;

  private menuStateSub;

  constructor(
    private menuService: MenuService
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
