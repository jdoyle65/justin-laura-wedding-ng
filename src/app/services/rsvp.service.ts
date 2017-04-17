import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RsvpService {

  public user: BehaviorSubject<any>;
  public token: BehaviorSubject<string>;

  constructor() {
    this.user = new BehaviorSubject({
      name: 'Justin Doyle',
      maxGuests: 2,
      guests: [
        {name: 'Guest 1', selectedMeal: null, dietaryRestrictions: ''}
      ],
      selectedMeal: null,
      dietaryRestrictions: ''
    });
    this.token = new BehaviorSubject('');
  }

  setUser(user) {
    this.user.next(user);
  }

  setToken(token) {
    this.token.next(token);
  }

}
