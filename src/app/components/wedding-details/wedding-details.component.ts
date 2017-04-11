import { Component, OnInit } from '@angular/core';
import { routeAnimation } from '../../utility/animations';

@Component({
  selector: 'jl-wedding-details',
  templateUrl: './wedding-details.component.html',
  host: { '[@routeAnimation]': 'true' },
  styles: [':host { display: block }'],
  animations: [routeAnimation]
})
export class WeddingDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
