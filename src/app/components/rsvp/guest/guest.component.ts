import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jl-guest',
  templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit {

  @Input() user;
  @Input() guest;
  private editing = false;
  private guestNameEdit: string;

  constructor() { }

  ngOnInit() {
    this.guestNameEdit = this.guest.name;
  }

  onClickEdit() {
    this.editing = true;
    this.guestNameEdit = this.guest.name;
  }

  onClickSave() {
    this.editing = false;
    this.guest.name = this.guestNameEdit;
  }

}
