import { Component, OnInit, OnDestroy } from '@angular/core';
import { routeAnimation } from '../../utility/animations';
import { RsvpService } from '../../services/rsvp.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'jl-rsvp',
  templateUrl: './rsvp.component.html',
  host: { '[@routeAnimation]': 'true' },
  styles: [':host { min-height:100%; display: block; }'],
  animations: [routeAnimation]
})
export class RsvpComponent implements OnInit, OnDestroy {

  public mealEdit;
  public songRequest;
  public accommodations;
  public attendingPaddys;
  public dietaryRestrictions;
  public loggedIn = false;
  public errorMessage = '';
  public saveStatus = 'done';
  public saveError = 'Error saving data.';
  public modalOpen = false;

  private token: string;
  private user;
  private userSub;
  private tokenSub;
  private mealOptions = [];
  private typingTimeout = null;

  constructor(
    private rsvpService: RsvpService,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.rsvpService.saveStatus.subscribe(status => this.saveStatus = status);
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
    this.errorMessage = '';
    let token = this.token.concat(''); // Clone the string
    token = this.characterService.removeDiacritics(token);
    console.log(token);

    this.rsvpService.setToken(token)
      .catch(json => {
        if (json.error == 1) {
          this.errorMessage = `Invalid name: ${token}`;
        } else {
          this.errorMessage = json.message;
        }
      });
  }

  onClickLogout() {
    this.rsvpService.clearToken();
  }

  onChangeMeal() {
    this.user.selectedMeal = this.mealEdit;
    this.saveUser(this.user);
  }

  onChangeAttendingPaddys() {
    this.user.attendingPaddys = this.attendingPaddys;
    this.saveUser(this.user);
  }

  onChangeTextField(model, userProp) {
    this.user[userProp] = this[model];
    this.registerTypingTimeout();
  }

  openNotAttendingModal() {
    this.modalOpen = true;
  }

  closeNotAttendingModal() {
    this.modalOpen = false;
  }

  confirmNotAttending() {
    this.closeNotAttendingModal();
    this.user.isAttending = false;
    this.saveUser(this.user);
  }

  private registerTypingTimeout() {
    this.clearTypingTimeout();
    this.typingTimeout = setTimeout(() => {
      this.saveUser(this.user);
    }, 1000);
  }

  private clearTypingTimeout() {
    if (this.typingTimeout !== null) {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = null;
    }
  }

  private saveUser(user): void {
    console.log('User saving...');
    this.rsvpService.setUser(user);
  }

  private onUserSetup(user): void {
    if ('undefined' === typeof user) {
      return;
    }

    this.user = user;
    this.mealEdit = user.selectedMeal;
    this.dietaryRestrictions = user.dietaryRestrictions;
    this.mealOptions = user.mealOptions;
    this.songRequest = user.songRequest;
    this.accommodations = user.accommodations;
    this.attendingPaddys = user.attendingPaddys;
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
