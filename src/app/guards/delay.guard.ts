import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DelayGuard implements CanActivate, CanDeactivate<any> {

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 500);
    })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 500);
    })
  }
}
