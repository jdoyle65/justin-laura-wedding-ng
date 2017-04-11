import { Component, OnInit } from '@angular/core';
import { routeAnimation } from '../../utility/animations';

@Component({
  selector: 'jl-splash-screen',
  templateUrl: './splash-screen.component.html',
  host: { '[@routeAnimation]': 'true' },
  styles: [':host { display: block }'],
  animations: [routeAnimation]
})
export class SplashScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
