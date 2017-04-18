import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RsvpService {

  public user: BehaviorSubject<any>;
  public token: BehaviorSubject<string>;

  constructor() {
    this.user = new BehaviorSubject(this.assignGuestIds({
      name: 'Justin Doyle',
      maxGuests: 2,
      guests: [
        {id: 0, name: 'Guest 1', selectedMeal: null, dietaryRestrictions: ''}
      ],
      selectedMeal: null,
      dietaryRestrictions: '',
      mealOptions: [
        {id: 0, name: 'Chicken w/ Vegetables'},
        {id: 1, name: 'Salmon w/ Vegetables'}
      ]
    }));
    this.token = new BehaviorSubject(this.checkForSavedToken());
  }

  setUser(user) {
    const u = this.assignGuestIds(user);
    this.user.next(u);
  }

  setToken(token) {
    window.localStorage.setItem('token', token);
    this.token.next(token);
  }

  clearToken() {
    window.localStorage.setItem('token', '');
    this.token.next('');
  }

  private checkForSavedToken(): string {
    const token = window.localStorage.getItem('token');
    if ('undefined' === typeof token || null === token) {
      return '';
    }

    return token;
  }

  private assignGuestIds(user) {
    user.guests = user.guests.map((g, i) => {
      g.id = i;
      return g;
    });
    return user;
  }

}
