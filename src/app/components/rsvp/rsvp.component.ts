import { Component, OnInit, OnDestroy } from '@angular/core';
import { routeAnimation } from '../../utility/animations';
import { RsvpService } from '../../services/rsvp.service';

@Component({
  selector: 'jl-rsvp',
  templateUrl: './rsvp.component.html',
  host: { '[@routeAnimation]': 'true' },
  styles: [':host { min-height:100%; display: block; }'],
  animations: [routeAnimation]
})
export class RsvpComponent implements OnInit, OnDestroy {

  public mealEdit;
  public loggedIn = false;

  private token: string;
  private user;
  private userSub;
  private tokenSub;
  private mealOptions = [];

  constructor(
    private rsvpService: RsvpService
  ) { }

  ngOnInit() {
    this.tokenSub = this.rsvpService.token.subscribe(token => {
      this.token = token;
      if ('undefined' !== typeof token && token.length > 0) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
    this.userSub = this.rsvpService.user.subscribe(user => this.onUserSetup(user));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.tokenSub.unsubscribe();
  }

  onClickLogin() {
    this.rsvpService.setToken(this.token);
  }

  onClickLogout() {
    this.rsvpService.clearToken();
  }

  onChangeMeal() {
    this.user.selectedMeal = this.mealEdit;
    this.saveUser(this.user);
  }

  private saveUser(user): void {
    this.rsvpService.setUser(user);
  }

  private onUserSetup(user): void {
    if ('undefined' === typeof user) {
      return;
    }

    this.user = user;
    this.mealEdit = user.selectedMeal;
    this.mealOptions = user.mealOptions;
  }

  private addGuest(): void {
    const newUser = Object.assign({}, this.user);

    if (newUser.guests.length < newUser.maxGuests) {
      newUser.guests.push({
        name: '',
        selectedMeal: null,
        dietaryRestrictions: ''
      });
    }

    this.rsvpService.setUser(newUser);
  }
}
