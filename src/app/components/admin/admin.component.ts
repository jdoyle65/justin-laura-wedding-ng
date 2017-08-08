import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

@Component({
  selector: 'jl-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  public admin$: BehaviorSubject<any>;
  public attending$: Observable<Array<any>>;
  public notAttending$: Observable<Array<any>>;
  public possible$: Observable<Array<any>>;
  public noRsvp$: Observable<Array<any>>;
  public food$: Observable<Array<any>>;
  public paddys$: Observable<Array<any>>;
  public attendingCount = 0;
  public notAttendingCount = 0;
  public possibleCount = 0;
  public noRsvpCount = 0;
  public paddysCount = 0;
  public mealMap = ['Chicken', 'Salmon', 'Veggie'];
  public songRequests = [];

  constructor(
  private AdminService: AdminService
  ) { }

  ngOnInit() {
    this.admin$ = new BehaviorSubject({});
    this.buildAttendingStream();
    this.buildNotAttendingStream();
    this.buildPossibleStream();
    this.buildNoRsvpStream();
    this.buildFoodStream();
    this.buildPaddysStream();
    this.AdminService.adminData.subscribe(data => this.admin$.next(data));
    this.AdminService.getAdminData();
  }


  buildAttendingStream() {
    this.attending$ = this.admin$
    .switchMap(adminData => {
      if ('undefined' === typeof adminData.rsvps) {
        return Observable.empty();
      }

      const rsvps = adminData.rsvps;
      return Observable.of(rsvps.filter(rsvp => {
        return rsvp.savedRsvp && rsvp.isAttending && rsvp.rsvpKey !== 'justindoyle';
      }))
      .do(attending => {
        this.attendingCount = attending.reduce((total, rsvp) => {
          return (total + 1 + rsvp.guests.length);
        }, 0);
        this.songRequests = attending.filter(rsvp => rsvp.songRequest !== '').map(rsvp => `${rsvp.songRequest} (Requested by: ${rsvp.name})`);
      });
    });
  }

  buildNotAttendingStream() {
    this.notAttending$ = this.admin$
    .switchMap(adminData => {
      if ('undefined' === typeof adminData.rsvps) {
        return Observable.empty();
      }

      const rsvps = adminData.rsvps;
      return Observable.of(rsvps.filter(rsvp => {
        return !rsvp.isAttending && rsvp.rsvpKey !== 'justindoyle';
      }))
      .do(attending => {
        this.notAttendingCount = attending.reduce((total, rsvp) => {
          return (total + 1 + rsvp.guests.length);
        }, 0);
      });
    });
  }

  buildPossibleStream() {
    this.possible$ = this.admin$
    .switchMap(adminData => {
      if ('undefined' === typeof adminData.rsvps) {
        return Observable.empty();
      }

      const rsvps = adminData.rsvps;
      return Observable.of(rsvps.filter(rsvp => {
        return !rsvp.savedRsvp && !rsvp.isAttending
        && (rsvp.songRequest !== ''
        || rsvp.attendingPaddys === true
        || rsvp.attendingPaddys === 'true'
        || rsvp.accommodations !== ''
        || rsvp.dietaryRestrictions !== ''
        || parseInt(rsvp.selectedMeal, 0) !== 0
        )
        && rsvp.rsvpKey !== 'justindoyle';
      }))
      .do(attending => {
        this.possibleCount = attending.reduce((total, rsvp) => {
          return (total + 1 + rsvp.guests.length);
        }, 0);
      });
    });
  }

  buildNoRsvpStream() {
    this.noRsvp$ = this.admin$
    .switchMap(adminData => {
      if ('undefined' === typeof adminData.rsvps) {
        return Observable.empty();
      }

      const rsvps = adminData.rsvps;
      return Observable.of(rsvps.filter(rsvp => {
        return !rsvp.savedRsvp && rsvp.isAttending && rsvp.rsvpKey !== 'justindoyle';
      }))
      .do(attending => {
        this.noRsvpCount = attending.reduce((total, rsvp) => {
          return (total + 1 + rsvp.guests.length);
        }, 0);
      });
    });
  }

  buildFoodStream() {
    this.food$ = this.attending$
      .switchMap(rsvps => {
        if (!Array.isArray(rsvps)) {
          return Observable.empty();
        }

        const foods = [
          {id: 0, name: 'Chicken', count: 0},
          {id: 1, name: 'Salmon', count: 0},
          {id: 2, name: 'Veggie', count: 0}
        ];

        const foodStats = rsvps.reduce((accum: Array<any>, rsvp) => {
          const meal = parseInt(rsvp.selectedMeal, 0);
          let guestMeals = [];
          if (Array.isArray(rsvp.guests)) {
            guestMeals = rsvp.guests.map(guest => parseInt(guest.selectedMeal, 0));
          }

          accum.find(val => val.id === meal).count += 1;
          guestMeals.forEach(guestMeal => {
            accum.find(val => val.id === guestMeal).count += 1;
          });

          return accum;
        }, foods);

        return Observable.of(foodStats);
      });
  }

  buildPaddysStream() {
    this.paddys$ = this.attending$
      .switchMap(rsvps => {
        if (!Array.isArray(rsvps)) {
          return Observable.empty();
        }
        const paddys = rsvps.filter(rsvp => rsvp.attendingPaddys);
        return Observable.of(paddys);
      })
      .do((attending: Array<any>) => {
        this.paddysCount = attending.reduce((total, rsvp) => {
          return (total + 1 + rsvp.guests.length);
        }, 0);
      });
  }
}
