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

  private loggedIn = false;
  private token: string;
  private user;
  private userSub;
  private tokenSub;

  constructor(
    private rsvpService: RsvpService
  ) { }

  ngOnInit() {
    this.tokenSub = this.rsvpService.token.subscribe(token => {
      this.token = token;
      if ('undefined' !== typeof token && token.length > 0) {
        this.loggedIn = true;
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

  private onUserSetup(user): void {
    this.user = user;
  }

  private addGuest(): void {
    const newUser = Object.assign({}, this.user);

    if (newUser.guests.length < newUser.maxGuests) {
      newUser.guests.push({
        name: 'New Guest',
        selectedMeal: 0,
        dietaryRestrictions: ''
      });
    }

    this.rsvpService.setUser(newUser);
  }
}
