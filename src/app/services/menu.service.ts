import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MenuService {

  public menuState: Observable<boolean>;
  private menuStateSubject: Subject<boolean>;

  constructor() {
    this.menuStateSubject = new Subject();
    this.menuStateSubject.next(false);
    
    this.menuState = this.menuStateSubject.asObservable();
  }

  public setMenuState(isOpen: boolean): void {
    this.menuStateSubject.next(isOpen);
  }

}
