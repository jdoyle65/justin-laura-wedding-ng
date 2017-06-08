import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routeAnimation } from '../../utility/animations';

@Component({
  selector: 'jl-gifts',
  templateUrl: './gifts.component.html',
  host: { '[@routeAnimation]': 'true' },
  styles: [':host { display: block }'],
  animations: [routeAnimation]
})
export class GiftsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector("#" + f);
      if (element) element.scrollIntoView(element)
    });
  }

}
