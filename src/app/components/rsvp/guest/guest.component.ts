import { Component, Input, OnInit } from '@angular/core';

import { RsvpService } from '../../../services/rsvp.service';

@Component({
  selector: 'jl-guest',
  templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit {

  @Input() user;
  @Input() guest;
  private editing = false;
  private guestNameEdit: string;
  private guestMealEdit: number|null;
  private mealOptions;

  constructor(
    private rsvpService: RsvpService
  ) { }

  ngOnInit() {
    this.guestNameEdit = this.guest.name;
    this.guestMealEdit = this.guest.selectedMeal;
    this.mealOptions = this.user.mealOptions;
  }

  onClickEdit() {
    this.editing = true;
    this.guestNameEdit = this.guest.name;
  }

  onClickSave() {
    this.editing = false;
    this.guest.name = this.guestNameEdit;
    this.guest.selectedMeal = this.guestMealEdit;
    this.rsvpService.setUser(this.user);
  }

  onClickDelete() {
    const index = this.user.guests.findIndex(g => g.id === this.guest.id);

    if (index >= 0) {
      const guests = this.user.guests;
      this.user.guests = guests.slice(0, index)
        .concat(guests.slice(index + 1, guests.length));
    }

    this.rsvpService.setUser(this.user);
  }

}
