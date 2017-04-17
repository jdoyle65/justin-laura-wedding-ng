import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MenuService } from '../services/menu.service';

@Injectable()
export class DelayGuard implements CanActivate, CanDeactivate<any> {

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuService: MenuService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 500);
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 500);
    });
  }
}
